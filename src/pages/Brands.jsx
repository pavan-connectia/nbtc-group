import React from "react";
import {
  Head,
  Heading,
  Hero,
  Img,
  MaxContainer,
  SetInnerHtml,
} from "../components";
import { contactImg } from "../assets";
import ProjectsCard from "../components/projects/ProjectsCard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetBrandsByIdQuery } from "../redux/api/brandsApi";
import EquipmentCard from "../components/core-business/EquipmentCard";

const Brands = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();

  const { data } = useGetBrandsByIdQuery(id);

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Brands | NBTC"}
        description={data?.data?.seo?.metaDescription}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={contactImg} heading={"Brands"} />

      <MaxContainer className="max-w-[1200px] space-y-20 px-3 py-5">
        <div className="mt-10 flex flex-col justify-between gap-5 md:flex-row lg:gap-8">
          <div className="space-y-3">
            <Heading variant="big" className="text-left uppercase">
              {data?.data?.brand?.name?.[currentLang]}
            </Heading>
            <Img
              dynamic
              src={data?.data?.brand?.image}
              className="h-auto w-full max-w-sm"
            />

            <SetInnerHtml
              text={data?.data?.brand?.description?.[currentLang]}
            />
          </div>
        </div>

        <div className="space-y-5 py-5">
          <Heading
            variant="big"
            className="text-left text-lg sm:text-xl md:text-2xl lg:text-3xl rtl:text-right"
          >
            Projects
          </Heading>
          {data?.data?.caseStudies?.equipment}
          <div className="scrollbar-hide flex gap-5 overflow-x-auto">
            {data?.data?.caseStudies?.projects?.map((p) => (
              <ProjectsCard projects={p} key={p?._id} />
            ))}
          </div>
        </div>

        <div className="space-y-5 py-5">
          <Heading
            variant="big"
            className="text-left text-lg sm:text-xl md:text-2xl lg:text-3xl rtl:text-right"
          >
            Equipments Used
          </Heading>

          <div className="scrollbar-hide flex gap-5 overflow-x-auto">
            {data?.data?.caseStudies?.equipments?.map((e) => (
              <EquipmentCard equipment={e} key={e?._id} />
            ))}
          </div>
        </div>
      </MaxContainer>
    </>
  );
};

export default Brands;
