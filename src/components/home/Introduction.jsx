import React, { lazy, Suspense } from "react";
import { Img, SetInnerHtml } from "../";
import { journey, mission, values, vision } from "@/assets";
import { useTranslation } from "react-i18next";
import { useGetHomeQuery } from "@/redux/api/homeApi";

const GlobeComponent = lazy(() => import("../comman/GlobeeComponent"));

const Introduction = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetHomeQuery();
  const homeData = data?.data || { journey: {}, mission: {}, value: {} };
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <div className="mx-auto mt-20 flex max-w-[1280px] flex-wrap items-center gap-5 px-3 py-10 md:gap-8 lg:gap-10">
      <div className="overflow-x-auto lg:w-[55%] lg:px-5">
        <div className="h-full w-full overflow-x-auto bg-white">
          <Suspense fallback={<div className="size-full" />}>
            <GlobeComponent />
          </Suspense>
        </div>
      </div>
      <div className="space-y-5 lg:w-[40%]">
        <div className="space-y-2">
          <div className="font-kanit flex items-center gap-x-3 text-blue">
            <div>
              <Img src={journey} className="size-8 object-contain p-1" />
            </div>
            <h5 className="text-lg font-medium">{t("home.journey")}</h5>
          </div>
          <SetInnerHtml
            className="text-sm"
            text={homeData?.journey?.[currentLang] || ""}
          />
        </div>

        <div className="space-y-2">
          <div className="font-kanit flex items-start gap-x-3 text-blue">
            <div>
              <Img src={mission} className="size-8 object-contain p-1" />
            </div>
            <h5 className="text-lg font-medium">{t("home.mission")}</h5>
          </div>
          <SetInnerHtml
            className="font-lato text-sm text-blue"
            text={homeData?.mission?.[currentLang]}
          />
        </div>

        <div className="space-y-2">
          <div className="font-kanit flex items-start gap-x-3 text-blue">
            <div>
              <Img src={vision} className="size-8 object-contain p-1" />
            </div>
            <h5 className="text-lg font-medium">{t("home.vision")}</h5>
          </div>
          <SetInnerHtml
            className="font-lato text-sm text-blue"
            text={homeData?.vision?.[currentLang]}
          />
        </div>

        <div className="space-y-2">
          <div className="font-kanit flex items-start gap-x-3 text-blue">
            <div>
              <Img src={values} className="size-8 object-contain p-1" />
            </div>
            <h5 className="text-lg font-medium">{t("home.value")}</h5>
          </div>
          <SetInnerHtml
            text={homeData?.value?.[currentLang]}
            className="list-disc text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
