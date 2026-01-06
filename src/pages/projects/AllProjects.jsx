import React, { useEffect, useState } from "react";
import { Button, Head, Heading, Hero, MaxContainer } from "@/components";
import { projectsImg } from "@/assets";
import ProjectsCard from "@/components/projects/ProjectsCard";
import { useGetProjectsQuery } from "@/redux/api/projectsApi";
import { useTranslation } from "react-i18next";
import { useGetNavbarItemsQuery } from "@/redux/api/coreBusinessApi";

const AllProjects = () => {
  const { t } = useTranslation();
  const { data: navData } = useGetNavbarItemsQuery();
  const { data } = useGetProjectsQuery();

  const options = [
    { key: "featured", label: `${t("home.featured")}` },
    { key: "ongoing", label: `${t("home.ongoing")}` },
    { key: "all", label: `${t("home.all")}` },
  ];

  const [selectedOption, setSelectedOption] = useState("featured");

  const fltrData = data?.data?.filter((d) => {
    if (selectedOption === "all") return true;
    return d.type === selectedOption;
  });

  useEffect(() => {
    setSelectedOption("featured");
  }, [navData]);

  return (
    <>
      <Head title={data?.data?.projects?.seo?.title || "Projects | NBTC"} />
      <Hero src={projectsImg} heading="Projects" />

      <MaxContainer className="max-w-[1200px] px-3">
        <Heading variant="big" className="pb-6 pt-10 uppercase">
          Projects
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
              } rounded border px-4 py-2`}
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

export default AllProjects;
