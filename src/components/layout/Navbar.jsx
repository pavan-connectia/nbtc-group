import React, { useRef, useState, useEffect, useMemo } from "react";
import { LuChevronDown, LuMenu, LuPhoneCall } from "react-icons/lu";
import { Link, NavLink, useLocation } from "react-router-dom";
import useClickOutside from "@/hooks/useClickOutside";
import HyperLink from "../ui/HyperLink";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";
import { useGetNavbarItemsQuery } from "@/redux/api/coreBusinessApi";

export default function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { data } = useGetNavbarItemsQuery();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const sideBarRef = useRef(null);
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  useClickOutside(sideBarRef, () => setMenuOpen(false));

  const fltrCoreBusiness = useMemo(
    () => data?.data?.filter((d) => d?.displayCoreBusiness === true),
    [data]
  );

  const fltrProjects = useMemo(
    () => data?.data?.filter((d) => d?.displayProjects === true),
    [data]
  );

  const nav = [
    { title: t("nav.home"), href: "/" },
    {
      title: t("nav.about.title"),
      submenu: [
        { title: t("nav.about.submenu.corporateProfile"), href: "/about" },
        { title: t("about.visionMissionValues"), href: "/about/vision-mission-values" },
        { title: t("nav.about.submenu.chairmanMsg"), href: "/about/chairman-msg" },
        { title: t("nav.about.submenu.mdMsg"), href: "/about/md-msg" },
        { title: t("nav.about.submenu.executiveManagement"), href: "/about/executive-management" },
        { title: t("nav.about.submenu.subsidiaries"), href: "/about/subsidiary" },
      ],
    },
    {
      title: t("nav.coreBusiness.title"),
      submenu: fltrCoreBusiness?.map((d) => ({
        title: d?.name[currentLang],
        href: d?.hasSubDomain ? d?.learnMore : `/core-business/${d?.href}`,
      })),
    },
    { title: t("nav.qhse.title"), href: "/qhse" },
    {
      title: t("nav.projects.title"),
      submenu: fltrProjects?.map((d) => ({
        title: d?.name[currentLang],
        href: `/projects/${d?.href}`,
      })),
    },
    {
      title: t("nav.news.title"),
      submenu: [
        { title: t("nav.news.submenu.newsEvents"), href: "/news" },
        { title: t("nav.news.submenu.csr"), href: "/news/csr" },
        { title: t("nav.news.submenu.photoGallery"), href: "/news/photo-gallery" },
        { title: t("nav.news.submenu.videoGallery"), href: "/news/video-gallery" },
        { title: t("nav.news.submenu.publications"), href: "/news/publication" },
      ],
    },
    {
      title: t("nav.supportServices.title"),
      submenu: [
        { title: t("nav.supportServices.submenu.adminHR"), href: "/support-functions/admin-human-resources" },
        { title: t("nav.supportServices.submenu.financeAccounts"), href: "/support-functions/finance-accounts" },
        { title: t("nav.supportServices.submenu.materialManagement"), href: "/support-functions/material-management" },
        { title: t("nav.supportServices.submenu.informationTechnology"), href: "/support-functions/information-technology" },
        { title: t("nav.supportServices.submenu.governanceRiskCompliance"), href: "/support-functions/governance-risk-compliance" },
      ],
    },
    {
      title: t("nav.regions.title"),
      submenu: [
        { title: "Kuwait", href: "/regions/kuwait" },
        { title: "UAE", href: "/regions/auh" },
        { title: "KSA", href: "/regions/ksa" }
      ],
    },
    { title: t("nav.careers"), href: "/careers" },
  ];

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }


    if (currentScrollY > lastScrollY) {
    
      setIsVisible(false);
    } else {
      
      setIsVisible(true);
    }

    
    if (currentScrollY < 50) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); 

  const isTransparent =
    location.pathname === "/" ||
    /^\/core-business\/[^/]+$/.test(location.pathname);

  return (
    <header
      className={`z-50 w-full p-3 lg:p-5 ${
        !isTransparent ? "bg-blue/90" : "absolute top-0 bg-transparent"
      }`}
    >

      <div
        className={`transition-transform duration-300 ease-in-out ${
          isSticky ? "fixed left-0 top-0 z-40 w-full bg-blue/90 shadow-lg" : ""
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className={`mx-auto max-w-[1280px] ${isSticky ? "p-3" : ""}`}>
          <div className="flex items-center justify-between">
            <Link to="/" aria-label="logo" className="z-50 shrink-0">
              <img src="/logo.png" alt="Logo" className="w-[200px] object-contain" />
            </Link>

            <div className="relative hidden items-center justify-between rounded-md bg-transparent px-3 py-1.5 text-textGray lg:flex">
              <LanguageToggle />
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="z-50 lg:hidden">
              <LuMenu size={20} className="text-white" />
            </button>
          </div>

          <DesktopMenu
            nav={nav}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
      </div>

      <nav
        className={`fixed top-0 z-[100] h-screen overflow-y-auto py-5 duration-700 lg:hidden ${
          menuOpen ? "right-0" : "-right-full"
        } w-full max-w-[300px] bg-black`}
        ref={sideBarRef}
      >
        <div className="flex flex-col gap-5 py-5 text-sm">
          {nav.map((navItem, idx) => (
            <div key={idx} className="font-kanit relative">
              {!navItem.submenu ? (
                <NavLink
                  to={navItem.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center py-2 pl-10 text-textGray"
                >
                  {navItem.title}
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() =>
                      activeMobileMenu === idx
                        ? setActiveMobileMenu(null)
                        : setActiveMobileMenu(idx)
                    }
                    className="flex w-full items-center py-2 pl-10 text-textGray"
                  >
                    {navItem.title}
                    <LuChevronDown
                      className={`ml-1.5 transition-transform ${
                        activeMobileMenu === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeMobileMenu === idx && (
                    <div className="bg-black text-textGray">
                      {navItem.submenu.map((sub, subIdx) => (
                        <NavLink
                          key={subIdx}
                          to={sub.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-3 pl-12 hover:bg-gray-800"
                        >
                          {sub.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div className="ml-8 mt-3">
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

function DesktopMenu({ nav, activeMenu, setActiveMenu }) {
  const { t } = useTranslation();

  return (
    <nav className="font-kanit relative z-50 hidden w-full items-center gap-1 px-3 pb-2 lg:flex">
      <div className="flex w-full items-center justify-between">
        {nav.map((item, idx) => (
          <div
            key={idx}
            className="relative"
            onMouseEnter={() => setActiveMenu(idx)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {!item.submenu ? (
              <NavLink 
                to={item.href} 
                className="text-textGray text-[0.9rem] hover:text-white transition-colors"
              >
                {item.title}
              </NavLink>
            ) : (
              <button className="flex items-center text-textGray text-[0.9rem] hover:text-white transition-colors">
                {item.title}
                <LuChevronDown
                  className={`${activeMenu === idx ? "rotate-180" : ""} ml-1.5 transition-transform`}
                />
              </button>
            )}

            {item.submenu && activeMenu === idx && (
              <div className="absolute left-0 top-full z-[60] w-[20rem] pt-4">
                <div className="rounded-lg bg-white shadow-xl">
                  {item.submenu.map((sub, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={sub.href}
                      className="block border-b border-gray-100 px-5 py-2.5 text-blue text-[0.9rem] hover:bg-gray-50 hover:border-l-4 hover:border-l-red transition-all"
                    >
                      {sub.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <HyperLink
          href="/contact"
          className="border-[#F2F3F5] bg-[#F2F3F5]/[0.12] text-sm text-[#F2F3F5] hover:bg-[#F2F3F5]/[0.2] transition-colors"
          children={t("nav.contact_us")}
          variant="outline"
          icon={<LuPhoneCall />}
        />
      </div>
    </nav>
  );
}