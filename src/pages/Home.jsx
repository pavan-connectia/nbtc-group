import React, { lazy, Suspense } from "react";
import useInView from "../hooks/useInView";
import { Head } from "../components";
import { useGetHomeQuery } from "@/redux/api/homeApi";

// Lazy-loaded components
const HeroSection = lazy(() => import("../components/home/HeroSection"));
const Introduction = lazy(() => import("../components/home/Introduction"));
const OurServices = lazy(() => import("../components/home/OurServices"));
const HomeProjects = lazy(() => import("../components/home/HomeProjects"));
const Client = lazy(() => import("../components/home/Client"));
const OurMilestones = lazy(() => import("../components/home/OurMilestones"));
const Awards = lazy(() => import("../components/home/Awards"));
const Afflicates = lazy(() => import("../components/home/Afflicates"));
const EmployeeLinks = lazy(() => import("../components/home/EmployeeLinks"));
const FeaturedNews = lazy(() => import("../components/home/FeaturedNews"));
const ContactForm = lazy(() => import("../components/comman/ContactForm"));

const LazyLoadComponent = ({ Component }) => {
  const { isInView, elementRef } = useInView();

  return (
    <div ref={elementRef}>
      {isInView ? (
        <Suspense fallback={<div className="min-h-screen overflow-hidden" />}>
          <Component />
        </Suspense>
      ) : (
        <div className="min-h-screen overflow-hidden" />
      )}
    </div>
  );
};

const Home = () => {
  const { data } = useGetHomeQuery(import.meta.env.VITE_DEPT_ID);
  const homeData = data?.data;
  return (
    <>
      <Head
        title={homeData?.seo?.title || "Home | NBTC"}
        description={homeData?.seo?.metaDescription || "Description"}
        canonical={homeData?.seo?.canonicalUrl}
        ogUrl={homeData?.seo?.ogUrl}
        ogImage={homeData?.seo?.ogImage}
        keywords={homeData?.seo?.metaKeywords}
      />
      <HeroSection />
      <LazyLoadComponent Component={Introduction} />
      <LazyLoadComponent Component={OurServices} />
      <LazyLoadComponent Component={HomeProjects} />
      <LazyLoadComponent Component={Client} />
      <LazyLoadComponent Component={OurMilestones} />
      <LazyLoadComponent Component={Awards} />
      <LazyLoadComponent Component={Afflicates} />
      <LazyLoadComponent Component={EmployeeLinks} />
      <LazyLoadComponent Component={FeaturedNews} />
      <LazyLoadComponent Component={ContactForm} />
    </>
  );
};

export default Home;
