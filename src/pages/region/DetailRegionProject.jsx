import React from "react";
import {
  Head,
  Heading,
  Hero,
  Img,
  MaxContainer,
  SetInnerHtml,
} from "@/components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuMapPin } from "react-icons/lu";
import { useGetRegionProjectsByIdQuery } from "@/redux/api/regionApi";

const DetailRegionProject = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { data } = useGetRegionProjectsByIdQuery(id);

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Projects | NBTC"}
        description={data?.data?.seo?.metaDescription || "Description"}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.dat?.seo?.metaKeywords}
      />
      <Hero
        dynamic
        src={data?.data?.image}
        heading={data?.data?.title?.[currentLang]}
      />

      <MaxContainer className="max-w-[1200px] space-y-3 px-3 pb-6 pt-10">
        <Heading
          variant="big"
          className="text-left text-lg sm:text-xl md:text-2xl lg:text-3xl rtl:text-right"
        >
          {data?.data?.title?.[currentLang]}
        </Heading>

        <div className="flex items-center gap-2 text-blue">
          <LuMapPin />
          {data?.data?.location?.[currentLang]}
        </div>
        <SetInnerHtml text={data?.data?.description?.[currentLang]} />

        <Heading
          variant="big"
          className="pt-10 text-left text-lg sm:text-xl md:text-2xl lg:text-3xl rtl:text-right"
        >
          Photos
        </Heading>
        <div className="grid grid-cols-1 gap-5 pb-20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data?.photos.map((p) => (
            <Img
              dynamic
              src={p}
              className="max-h-[90vh] max-w-full object-contain"
            />
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default DetailRegionProject;
