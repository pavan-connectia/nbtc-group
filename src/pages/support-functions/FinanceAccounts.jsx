import React from "react";
import { qhse } from "@/assets";
import { MaxContainer, Heading, Hero, SetInnerHtml } from "@/components";
import { useGetSupportServiceQuery } from "@/redux/api/supportServiceApi";
import { useTranslation } from "react-i18next";

const FinanceAccounts = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetSupportServiceQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const finaceData = data?.data || {};

  return (
    <>
      

      <MaxContainer className="max-w-[1200px] px-5 py-10 sm:py-12 md:py-16">
        <Heading variant="big" className="pb-10 uppercase">
          {t("nav.supportServices.submenu.financeAccounts")}
        </Heading>

        <SetInnerHtml
          text={finaceData?.finaceAccoutns?.[currentLang]}
          className="text-blue"
        />
      </MaxContainer>
    </>
  );
};

export default FinanceAccounts;
