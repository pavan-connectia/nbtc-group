import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Extracts:
 * numberPart: 400 / 4.5 / 102410
 * suffixPart: " Million" / " Billion USD" / " Ton"
 */
const splitNumberAndSuffix = (value = "") => {
  const match = value.match(/^([\d.]+)\s*(.*)$/);
  if (!match) return { numberPart: 0, suffixPart: "" };

  return {
    numberPart: parseFloat(match[1]),
    suffixPart: match[2] ? ` ${match[2]}` : "",
  };
};

const StatisticsCard = ({ statistic }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const { numberPart, suffixPart } = splitNumberAndSuffix(
    statistic?.number
  );

  const [animatedNumber, setAnimatedNumber] = useState(0);
  const duration = 6000;

  useEffect(() => {
    if (numberPart <= 0) return;

    let startTime;

    const animateNumber = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const value = progress * numberPart;
      setAnimatedNumber(
        numberPart % 1 === 0 ? Math.floor(value) : value.toFixed(1)
      );

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [numberPart]);

  return (
    <div
      className="
        group
        min-w-[190px]
        rounded-xl
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        border-l-4
        border-red
      "
    >
      <h4
        className="
          font-kanit
          mb-2
          text-3xl
          font-bold
          text-blue
          transition-colors
          duration-300
          group-hover:text-red
        "
      >
        {animatedNumber}
        <span className="ml-1 text-lg font-medium text-gray-500">
          {suffixPart}
        </span>
      </h4>

      <p className="font-lato text-sm font-medium text-gray-600">
        {statistic?.text[currentLang]}
      </p>
    </div>
  );
};

export default StatisticsCard;
