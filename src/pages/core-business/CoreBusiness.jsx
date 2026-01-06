import React from "react";
import {
  ContactForm,
  Head,
  Heading,
  Hero,
  HyperLink,
  MaxContainer,
  SetInnerHtml,
  StatisticsCard,
} from "@/components";
import { LuArrowRight } from "react-icons/lu";
import { useGetCoreBusinessByNameQuery } from "@/redux/api/coreBusinessApi";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const CoreBusiness = () => {
  const { t, i18n } = useTranslation();
  const { name } = useParams();
  const { data } = useGetCoreBusinessByNameQuery(name);

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Core Business | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero
        dynamic
        src={data?.data[0]?.banner}
        containerClass={"h-[43rem] overflow-visible"}
      >
        <MaxContainer>
          <div className="absolute top-[33%] z-10 max-w-4xl space-y-10 px-5 text-left md:px-8">
            <div className="font-kanit mb-4 text-2xl font-medium text-white sm:text-3xl md:text-4xl lg:text-[4rem]">
              <Heading
                variant="big"
                className="text-left text-xl font-medium leading-none text-white sm:text-2xl md:text-3xl lg:text-[2.5rem] rtl:text-right"
              >
                {data?.data[0]?.name[currentLang]}
              </Heading>
            </div>

            <SetInnerHtml
              className="font-lato mb-6 text-sm text-textGray sm:text-base rtl:text-right"
              text={data?.data[0]?.description[currentLang]}
            />

            <HyperLink
              href={data?.data[0]?.learnMore}
              className={"bg-red text-white"}
              icon={<LuArrowRight className="rtl:rotate-180" />}
            >
              {t("home.learn_more")}
            </HyperLink>
          </div>
          <div className="scrollbar-hide absolute top-[40rem] z-40 mx-auto flex w-full max-w-[1280px] justify-between gap-5 overflow-x-auto px-10">
            {data?.data[0]?.statistics?.map((s, idx) => (
              <StatisticsCard statistic={s} key={idx} />
            ))}
          </div>
        </MaxContainer>
      </Hero>

      <MaxContainer className="px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-16">
        <SetInnerHtml text={data?.data[0]?.mainDescription?.[currentLang]} />
      </MaxContainer>

      <ContactForm />
    </>
  );
};

export default CoreBusiness;
