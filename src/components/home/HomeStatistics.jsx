import { useGetHomeQuery } from "@/redux/api/homeApi";
import React from "react";
import { StatisticsCard } from "..";

const HomeStatistics = () => {
  const { data } = useGetHomeQuery();
  const homeData = data?.data || {};


  return (
    <>
      {homeData?.statistics?.map((s, idx) => (
        <StatisticsCard statistic={s} key={idx} />
      ))}
    </>
  );
};

export default HomeStatistics;
