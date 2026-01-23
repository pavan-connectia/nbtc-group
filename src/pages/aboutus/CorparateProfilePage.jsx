import React from "react";
import OurMilestones from "@/components/home/OurMilestones";
import { about } from "@/assets";
import {
  Heading,
  Img,
  MaxContainer,
  Hero,
  SetInnerHtml,
  Head,
} from "@/components";
import { useGetAboutusQuery } from "@/redux/api/aboutusApi";
import { useTranslation } from "react-i18next";
import { useGetBannerImagesQuery } from "@/redux/api/bannerApi";

const CorparateProfilePage = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetAboutusQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const aboutusData = data?.data || {};
 const { data:banner, isLoading } = useGetBannerImagesQuery();
  

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "About | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={`${import.meta.env.VITE_API_BASE_URL}/${banner?.data?.corporateProfile?.image}`} heading={t("about.about_us")} />

      <MaxContainer className="px-5 py-10 md:gap-8 md:py-20">
        <Heading variant="big" className="text-left capitalize rtl:text-right">
          {t("about.our_corporate_profile")}
        </Heading>
        <div className="flex flex-col justify-between gap-5 py-5 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <SetInnerHtml
              className={"text-blue sm:text-lg"}
              text={aboutusData?.profile?.description[currentLang]}
            />
          </div>

          <div className="h-[25rem] w-full bg-black lg:w-1/2 xl:h-[20rem]">
            <Img
              dynamic
              src={aboutusData?.profile?.image}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <SetInnerHtml
          className="mx-auto my-5 w-full max-w-4xl bg-white p-3 text-center text-red md:p-8 md:text-lg lg:text-xl"
          text={aboutusData?.profile?.quote[currentLang]}
        />
      </MaxContainer>

      <div className="py-10">
        <OurMilestones />
      </div>
    </>
  );
};

export default CorparateProfilePage;
