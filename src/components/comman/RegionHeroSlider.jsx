import React from "react";
import Slider from "react-slick";
import { Img } from "@/components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const RegionHeroSlider = ({ slides = [], dynamic = false }) => {
  if (!slides || slides.length === 0) return null;

  const settings = {
    dots: true,
    infinite: slides.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, 
    fade: true, 
    arrows: false, 
    pauseOnHover: false,
    dotsClass: "slick-dots custom-dots", 
  };

  return (
    <section className="relative h-[60vh] w-full overflow-hidden md:h-[70vh] lg:h-[85vh]">
      <Slider {...settings} className="h-full w-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[60vh] w-full md:h-[70vh] lg:h-[85vh]">
            <div className="relative h-full w-full">

              <Img
                dynamic={dynamic}
                src={slide.image}
                className="h-full w-full object-cover"
                alt={slide.heading || "Hero Image"}
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
                {slide.heading && (
                  <h1 className="max-w-4xl text-3xl font-bold uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.heading}
                  </h1>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>


      <style jsx global>{`
        .custom-dots {
          bottom: 25px !important;
        }
        .custom-dots li button:before {
          color: white !important;
          font-size: 12px !important;
          opacity: 0.5;
        }
        .custom-dots li.slick-active button:before {
          color: white !important;
          opacity: 1;
        }
        .slick-slider, .slick-list, .slick-track {
          height: 100%;
        }
      `}</style>
    </section>
  );
};

export default RegionHeroSlider;