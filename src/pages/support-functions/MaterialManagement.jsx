import React from "react";
import { qhse } from "@/assets";
import { MaxContainer, Heading, Img, Hero, SetInnerHtml } from "@/components";
import { useGetSupportServiceQuery } from "@/redux/api/supportServiceApi";
import { useTranslation } from "react-i18next";

const MaterialManagement = () => {
  const { i18n, t } = useTranslation();
  const { data } = useGetSupportServiceQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const materialData = data?.data || {};

  return (
    <>
      <Hero src={qhse} heading={t("nav.supportServices.title")} />

      <MaxContainer className="max-w-[1200px] px-5 py-10 sm:py-12 md:py-16">
        <Heading variant="big" className="pb-10 uppercase">
          {t("nav.supportServices.submenu.materialManagement")}
        </Heading>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center md:gap-8">
          <Img
            dynamic
            src={materialData?.materialManagement?.image}
            className="object-contain"
          />

          <SetInnerHtml
            text={materialData?.materialManagement?.description?.[currentLang]}
            className="text-blue"
          />
        </div>
      </MaxContainer>
    </>
  );
};

export default MaterialManagement;
