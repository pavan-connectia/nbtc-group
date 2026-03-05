import React, { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Heading, Img, QuotationForm } from "../";
import { useTranslation } from "react-i18next";
import { useGetCoreBusinessQuery } from "@/redux/api/coreBusinessApi";
import Marquee from "react-fast-marquee";

const OurServices = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetCoreBusinessQuery();
  const [showModal, setShowModal] = useState(false);
  
  // State to control marquee direction
  const [direction, setDirection] = useState("left");
  
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <div className="bg-blue overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-3 py-12 sm:px-8">
          <Heading className="text-white mb-10" variant="big">
            {t("home.our_services")}
          </Heading>

          {/* Wrapper for Marquee and Side Buttons */}
          <div className="relative flex items-center group">
            
            {/* Left Button */}
            <button 
              onClick={() => setDirection("right")}
              className="absolute left-0 z-30 bg-red p-3 text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100 disabled:opacity-50"
              aria-label="Move Right"
            >
              <LuArrowLeft size={24} className="rtl:rotate-180" />
            </button>

            <Marquee
              speed={100}
              gradient={false}
              pauseOnHover
              direction={direction} // Controlled by buttons
              className="w-full"
            >
              <div className="flex">
                {data?.data?.map((service) => (
                  <Link
                    to={`/core-business/${service?.href}`}
                    className="group/card relative mr-5 max-h-[258px] min-h-[258px] min-w-[290px] max-w-[290px] overflow-hidden transition-transform"
                    key={service?._id}
                  >
                    <Img
                      dynamic
                      src={service?.banner}
                      className="h-full w-full object-cover"
                    />
                    <div className="via-[rgba(242, 243, 245, 0.8)] absolute top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-[#F2F3F5] group-hover/card:bg-blue/80 group-hover/card:bg-none transition-all duration-300"></div>

                    <div className="absolute bottom-10 z-20 w-full space-y-2 px-3 text-center">
                      <h4 className="font-kanit font-semibold text-blue group-hover/card:text-white">
                        {service?.name?.[currentLang]}
                      </h4>
                      <p className="font-lato line-clamp-2 text-sm text-blue group-hover/card:text-textGray">
                        {service?.description?.[currentLang]}
                      </p>

                      <div className="mx-auto hidden w-fit bg-red px-2 py-1 text-center text-white group-hover/card:block">
                        <LuArrowRight className="rtl:rotate-180" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Marquee>

            {/* Right Button */}
            <button 
              onClick={() => setDirection("left")}
              className="absolute right-0 z-30 bg-red p-3 text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Move Left"
            >
              <LuArrowRight size={24} className="rtl:rotate-180" />
            </button>

          </div>
        </div>
      </div>

      <QuotationForm isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default OurServices;