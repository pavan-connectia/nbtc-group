import React from "react";
import { Card, Heading, HyperLink, Img } from "..";
import { LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { stripHtml } from "@/utils/truncateHtml";
import { useParams } from "react-router-dom";

const EquipmentCard = ({ equipment }) => {
  const { name } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <Card
      className="group min-w-[320px] max-w-[320px] space-y-4 border-red p-4 transition-all hover:border-t-4"
      key={equipment?._id}
    >
      <Img
        dynamic
        src={equipment?.featuredImg}
        className="object-cotain h-[9rem] w-[17rem]"
      />
      <div className="space-y-2">
        <Heading
          variant="small"
          children={equipment?.name[currentLang] || ""}
          className="text-left text-blue rtl:text-right"
        />
        <Heading
          className="line-clamp-2 font-light text-[#747D8F]"
          children={stripHtml(equipment?.overview[currentLang] || "")}
          Tag="p"
        />
        <HyperLink
          variant="outline"
          children="Explore More"
          href={
            `/core-business/${name}/equipments/${equipment?.category?.href}/${equipment?.subcategory?.href}/${equipment?._id}` ||
            ""
          }
          className="border-transparent pl-0 transition-all hover:border-red hover:pl-3"
          icon={<LuArrowRight className="rtl:rotate-180" />}
        >
          {t("coreBusiness.explore_more")}
        </HyperLink>
      </div>
    </Card>
  );
};

export default EquipmentCard;
