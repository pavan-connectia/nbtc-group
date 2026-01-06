import React from "react";
import { Heading, Paragraph } from "../";
import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetTestimonilalQuery } from "@/redux/api/testimonialApi";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetTestimonilalQuery();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div className="custom-dots">
        <ul className="m-0">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="m-[5px] inline-block size-[0.625rem] rounded-full bg-black"></div>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden bg-textGray p-5 md:p-8">
      <div className="mx-auto max-w-[1200px] space-y-4 py-8">
        <Heading variant="small">{t("home.testimonials")}</Heading>
        <Heading variant="big">{t("home.our_clients_say")}</Heading>

        <Slider {...settings} className="py-8">
          {data?.data?.map((d) => (
            <div
              className="min-h-[16.5rem] min-w-[17rem] space-y-4 bg-white p-5 py-10 md:p-7"
              key={d._id}
            >
              <div className="flex size-8 items-center justify-center bg-darkBlue">
                <FaQuoteRight className="h-[15px] w-[13px] text-white" />
              </div>
              <Paragraph>{d?.message[currentLang]}</Paragraph>
              <div>
                <Heading
                  className="text-left normal-case text-blue"
                  variant="small"
                >
                  {d?.name[currentLang]}
                </Heading>
                <Heading className="text-left normal-case" variant="small">
                  {d?.designation[currentLang]}
                </Heading>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
