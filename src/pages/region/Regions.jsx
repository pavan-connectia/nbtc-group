import React from "react";
import {
  Head,
  Heading,
  Hero,
  MaxContainer,
  SetInnerHtml,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  useGetRegionByRegionQuery,
} from "@/redux/api/regionApi";
import ProjectsCard from "@/components/projects/ProjectsCard";
import { useGetProjectsQuery } from "@/redux/api/projectsApi";

const Regions = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const { data: projects } = useGetProjectsQuery();
  const { data } = useGetRegionByRegionQuery(id);

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const fltrProj = projects?.data?.filter((p) => p.region === id);

  console.log(data)
  

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Regions | NBTC"}
        description={data?.data?.seo?.metaDescription}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero dynamic src={data?.data?.image} heading={data?.data?.name?.[currentLang]} />

      <MaxContainer className="max-w-[1200px] space-y-20 px-3 py-5">
        <div className="mt-10 flex flex-col justify-between gap-5 md:flex-row lg:gap-8">
          <div className="space-y-1">
            <SetInnerHtml text={data?.data?.description?.[currentLang]} />
          </div>
        </div>

        <div>
          <Heading className="text-center text-xl font-semibold text-blue sm:text-2xl md:text-3xl lg:text-4xl">
            Projects
          </Heading>
          <div className="grid grid-cols-1 gap-5 pb-20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {fltrProj?.map((r) => (
              <ProjectsCard
                projects={r}
                key={r?._id}
                href={`/regions/${id}/projects/${r?._id}`}
              />
            ))}
          </div>
        </div>

      </MaxContainer>
    </>
  );
};

export default Regions;
