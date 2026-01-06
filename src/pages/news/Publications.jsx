import React from "react";
import { MaxContainer, Hero, Head } from "@/components";
import { useGetPublicationQuery} from "@/redux/api/newsApi";
import { useTranslation } from "react-i18next";
import message from "@/assets/hero/message.webp";
import PublicationCard from "@/components/news/PublicationCard";

const Publications = () => {
  const { data } = useGetPublicationQuery();
  const { t } = useTranslation();
  console.log("Publication Data:", data);
  return <>
        <Head
        title={data?.data?.seo?.title || "Publication | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={message} heading={"LATEST PUBLICATIONS"} />
      <MaxContainer className="px-5 py-10 md:gap-8 md:py-16">
        <div className="flex flex-wrap justify-center gap-5 py-10 md:gap-8">
          {data?.data?.map((d) => (
          <PublicationCard key={d._id} publication={d} />
          ))}
        </div>
      </MaxContainer>
  </>;
};

export default Publications;
