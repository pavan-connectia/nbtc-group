import { useGetHomeQuery } from "@/redux/api/homeApi";
import React from "react";
import { StatisticsCard } from "..";

const HomeStatistics = () => {
  const { data } = useGetHomeQuery();
  const homeData = data?.data || {};

  const staticStatistics = [
    {
      number: "400 Million",
      text: {
        en: "Manhours Achieved",
        ar: "ساعات العمل المنجزة",
      },
    },
    {
      number: "102410 Ton",
      text: {
        en: "Steel Supply",
        ar: "توريد الفولاذ (طن)",
      },
    },
    {
      number: "4.5 Billion USD",
      text: {
        en: "Value of Completed Projects",
        ar: "قيمة المشاريع المنجزة (دولار أمريكي)",
      },
    },
  ];

  return (
    <>
      {homeData?.statistics?.map((s, idx) => (
        <StatisticsCard statistic={s} key={idx} />
      ))}

      {staticStatistics.map((s, idx) => (
        <StatisticsCard statistic={s} key={`static-${idx}`} />
      ))}
    </>
  );
};

export default HomeStatistics;
