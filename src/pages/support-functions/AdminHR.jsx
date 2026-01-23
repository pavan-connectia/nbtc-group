import React from "react";
import { qhse } from "@/assets";
import { MaxContainer, Heading, Img, Hero, SetInnerHtml } from "@/components";
import { useGetSupportServiceQuery } from "@/redux/api/supportServiceApi";
import { useTranslation } from "react-i18next";

const AdminHR = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetSupportServiceQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const adminData = data?.data || {};

  console.log(`import.meta.env.VITE_API_BASE_URL${adminData.image}`)

  return (
    <>
      <Hero src={`${import.meta.env.VITE_API_BASE_URL}${adminData.image}`} heading={t("nav.supportServices.title")} />

      <MaxContainer className="max-w-[1200px] px-5 py-10 sm:py-12 md:py-16">
        <Heading variant="big" className="pb-10 uppercase">
          {t("nav.supportServices.submenu.adminHR")}
        </Heading>
        <SetInnerHtml
          className="text-blue"
          text={adminData?.adminHr?.subHeading?.[currentLang]}
        />

        <div className="space-y-5 py-20">
          {adminData?.adminHr?.features?.map((f, idx) => (
            <div key={f?._id}>
              <Heading variant="big" className="font-medium">
                {f?.title?.[currentLang]}
              </Heading>

              <div
                className={`flex flex-col gap-5 py-10 sm:gap-8 lg:gap-10 ${
                  idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <Img
                  src={f?.image}
                  dynamic
                  className="h-[15rem] object-contain sm:min-w-[40%]"
                />
                <SetInnerHtml
                  text={f?.description?.[currentLang]}
                  className="text-blue"
                />
              </div>
            </div>
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default AdminHR;
