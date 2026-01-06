import React, { lazy, Suspense, useEffect} from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import i18n from "./i18n/i18n";
import { Layout, ScrollToTop } from "./components";

const Home = lazy(() => import("./pages/Home"));

const CorparateProfilePage = lazy(
  () => import("./pages/aboutus/CorparateProfilePage"),
);
const VisionMissionValues = lazy(
  () => import("./pages/aboutus/VisionMissionValues"),
);
const ChairmanMsg = lazy(() => import("./pages/aboutus/ChairmanMsg"));
const MdMsg = lazy(() => import("./pages/aboutus/MdMsg"));
const ExecutiveManagement = lazy(
  () => import("./pages/aboutus/ExecutiveManagement"),
);
const Qualifications = lazy(() => import("./pages/aboutus/Qualifications"));
const Subsidiary = lazy(() => import("./pages/aboutus/Subsidiary"));

const CoreBusiness = lazy(() => import("./pages/core-business/CoreBusiness"));
const Equipments = lazy(() => import("./pages/core-business/Equipments"));
const CategoryEquipment = lazy(
  () => import("./pages/core-business/CategoryEquipment"),
);
const SubCategoryEquipment = lazy(
  () => import("./pages/core-business/SubCategoryEquipment"),
);
const DetailEquipments = lazy(
  () => import("./pages/core-business/DetailEquipments"),
);

const QHSE = lazy(() => import("./pages/QHSE"));

const DetailProject = lazy(() => import("./pages/projects/DetailProject"));
const Projects = lazy(() => import("./pages/projects/Projects"));
const AllProjects = lazy(() => import("./pages/projects/AllProjects"));

const Csr = lazy(() => import("./pages/news/CSR"));
const News = lazy(() => import("./pages/news/News"));
const DetailNews = lazy(() => import("./pages/news/DetailNews"));
const PhotoGallery = lazy(() => import("./pages/news/PhotoGallery"));
const VideoGallery = lazy(() => import("./pages/news/VideoGallery"));
const Publications = lazy(() => import("./pages/news/Publications"));

const Regions = lazy(() => import("./pages/region/Regions"));
const DetailRegionProject = lazy(
  () => import("./pages/region/DetailRegionProject"),
);
const AdminHR = lazy(() => import("./pages/support-functions/AdminHR"));
const FinanceAccounts = lazy(
  () => import("./pages/support-functions/FinanceAccounts"),
);
const InformationTechnology = lazy(
  () => import("./pages/support-functions/InformationTechnology"),
);
const MaterialManagement = lazy(
  () => import("./pages/support-functions/MaterialManagement"),
);
const GRC = lazy(() => import("./pages/support-functions/GRC"));

const Career = lazy(() => import("./pages/Career"));
const Contact = lazy(() => import("./pages/Contact"));

const Brands = lazy(() => import("./pages/Brands"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <CorparateProfilePage /> },
  { path: "/about/vision-mission-values", element: <VisionMissionValues /> },
  { path: "/about/chairman-msg", element: <ChairmanMsg /> },
  { path: "/about/md-msg", element: <MdMsg /> },
  { path: "/about/executive-management", element: <ExecutiveManagement /> },
  { path: "/about/qualifications", element: <Qualifications /> },
  { path: "/about/subsidiary", element: <Subsidiary /> },
  { path: "/core-business/:name", element: <CoreBusiness /> },
  { path: "/core-business/:name/equipments", element: <Equipments /> },
  {
    path: "/core-business/:name/equipments/:category",
    element: <CategoryEquipment />,
  },
  {
    path: "/core-business/:name/equipments/:category/:subcategory",
    element: <SubCategoryEquipment />,
  },
  {
    path: "/core-business/:name/equipments/:category/:subcategory/:id",
    element: <DetailEquipments />,
  },
  { path: "/qhse", element: <QHSE /> },
  { path: "/projects/", element: <AllProjects /> },
  { path: "/projects/:name", element: <Projects /> },
  { path: "/projects/:name/:id", element: <DetailProject /> },
  { path: "/news", element: <News /> },
  { path: "/news/:id", element: <DetailNews /> },
  { path: "/news/csr", element: <Csr /> },
  { path: "/news/photo-gallery", element: <PhotoGallery /> },
  { path: "/news/video-gallery", element: <VideoGallery /> },
  { path: "/news/publication", element: <Publications /> },
  { path: "/regions/:id", element: <Regions /> },
  { path: "/regions/:id/projects/:id", element: <DetailRegionProject /> },
  { path: "/careers", element: <Career /> },
  {
    path: "/support-functions/admin-human-resources",
    element: <AdminHR />,
  },
  {
    path: "/support-functions/finance-accounts",
    element: <FinanceAccounts />,
  },
  {
    path: "/support-functions/material-management",
    element: <MaterialManagement />,
  },
  {
    path: "/support-functions/information-technology",
    element: <InformationTechnology />,
  },
  {
    path: "/support-functions/governance-risk-compliance",
    element: <GRC />,
  },
  { path: "/contact", element: <Contact /> },
  { path: "/brands/:id", element: <Brands /> },
  { path: "/employee-login", element: <EmployeeLogin /> },
  { path: "/*", element: <NotFound /> },
];

const App = () => {
  const { direction, language } = useSelector(
    (state) => state.layoutDirection
  );

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", language);
    i18n.changeLanguage(language);
  }, [direction, language]);

  return (
        <Layout>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center" />
        }
      >
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
