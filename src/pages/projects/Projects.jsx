import React, { useEffect, useState } from "react";
import { Button, Head, Heading, Hero, MaxContainer } from "@/components";
import { projectsImg } from "@/assets";
import { useParams } from "react-router-dom";
import ProjectsCard from "@/components/projects/ProjectsCard";
import { useGetProjectsByDepartmentQuery } from "@/redux/api/projectsApi";
import { useTranslation } from "react-i18next";
import { useGetNavbarItemsQuery } from "@/redux/api/coreBusinessApi";
import { useGetBannerImagesQuery } from "@/redux/api/bannerApi";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const { data: navData } = useGetNavbarItemsQuery();
  const { name } = useParams();
  const { data } = useGetProjectsByDepartmentQuery(name);
  const [pageHeading, setPageHeading] = useState();
  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const { data:banner, isLoading } = useGetBannerImagesQuery();

  const options = [
    { key: "kuwait", label: `kuwait` },
    { key: "ksa", label: `ksa` },
    { key: "auh", label: `auh` },
  ];

  const [selectedOption, setSelectedOption] = useState("kuwait");

  const fltrData = data?.data?.filter((d) => {
    return d.region === selectedOption;
  });

  useEffect(() => {
    const headingData = navData?.data?.find((n) => n?.href === name);
    setPageHeading(headingData);

    setSelectedOption("kuwait");
  }, [navData, name]);

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
      <Hero src={`${import.meta.env.VITE_API_BASE_URL}/${banner?.data?.project?.image}`} heading={pageHeading?.name?.[currentLang]} />

      <MaxContainer className="max-w-[1200px] px-3">
        <Heading variant="big" className="pb-6 pt-10 uppercase">
          {pageHeading?.name?.[currentLang]}
        </Heading>

        <div className="flex max-w-[1200px] items-center justify-center gap-x-3 overflow-hidden pt-3">
          {options.map(({ key, label }) => (
            <Button
              key={key}
              onClick={() => setSelectedOption(key)}
              className={`${
                selectedOption === key
                  ? "bg-blue text-white"
                  : "border-blue bg-white text-blue"
              } rounded border px-4 py-2 uppercase`}
              text={label}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 pb-20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {fltrData?.map((d) => (
            <ProjectsCard key={d?._id} projects={d} />
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default Projects;
