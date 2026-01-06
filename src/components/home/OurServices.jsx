import React, { useState } from "react";
import { LuArrowRight, LuPhoneCall } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Button, Heading, HyperLink, Img, QuotationForm } from "../";
import { useGetHomeQuery } from "@/redux/api/homeApi";
import { useTranslation } from "react-i18next";
import { useGetCoreBusinessQuery } from "@/redux/api/coreBusinessApi";
import Marquee from "react-fast-marquee";

const OurServices = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetCoreBusinessQuery();
  const [showModal, setShowModal] = useState(false);
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <div className="bg-blue">
        <div className="mx-auto max-w-[1280px] px-3 py-12 sm:px-8">
          <Heading className="text-white" variant="big">
            {t("home.our_services")}
          </Heading>

          <Marquee
            speed={150}
            gradient={false}
            pauseOnHover
            className="mx-auto max-w-[1100px]"
          >
            <div className="scrollbar-hide mt-10 flex w-full overflow-x-auto">
              {data?.data?.map((service) => (
                <Link
                  to={`/core-business/${service?.href}`}
                  className="group relative mr-5 max-h-[258px] min-h-[258px] min-w-[290px] max-w-[290px] overflow-hidden transition-transform"
                  key={service?._id}
                >
                  <Img
                    dynamic
                    src={service?.banner}
                    className="h-full w-full object-cover"
                  />
                  <div className="via-[rgba(242, 243, 245, 0.8)] absolute top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-[#F2F3F5] group-hover:bg-blue/80 group-hover:bg-none"></div>

                  <div className="absolute bottom-10 z-20 space-y-2 px-3 text-center">
                    <h4 className="font-kanit font-semibold text-blue group-hover:text-white">
                      {service?.name?.[currentLang]}
                    </h4>
                    <p className="font-lato line-clamp-2 text-sm text-blue group-hover:text-textGray">
                      {service?.description?.[currentLang]}
                    </p>

                    <Link
                      name={service?.title?.[currentLang]}
                      to={`/core-business/${service?.href}`}
                      className="mx-auto hidden w-fit bg-red px-2 py-1 text-center text-white group-hover:block"
                    >
                      <LuArrowRight className="rtl:rotate-180" />
                    </Link>
                  </div>
                </Link>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 md:flex-row">
        <div className="w-full bg-accent p-8">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <h5 className="font-lato text-sm font-medium text-blue">
              {t("home.free_quote")}
            </h5>
            <Button
              onClick={() => setShowModal(true)}
              href="/"
              text={t("home.get_a_quote")}
              className={"font-kanit bg-red text-sm font-light text-white"}
            />
          </div>
        </div>

        <div className="w-full bg-accent p-8">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <h5 className="font-lato text-sm font-medium text-blue">
              {t("home.not_sure_which_sol")}
            </h5>
            <HyperLink
              href="/contact"
              icon={<LuPhoneCall />}
              className={"font-kanit bg-red text-sm font-light text-white"}
            >
              {t("nav.contact_us")}
            </HyperLink>
          </div>
        </div>
      </div>

      <QuotationForm isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default OurServices;
