import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import "./slider.css";
import { Spin } from "antd";
import {
  FaAngleRight,
  FaChevronLeft,
  FaChevronRight,
  FaPlayCircle,
} from "react-icons/fa";
import Header from "../../../components/Header";
import { IoTimeOutline, IoTimeSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import { aniDubApi } from "../../../Api/Api";
import { Link } from "react-router-dom";

const Animation = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(aniDubApi)
      .then((res) => {
        const menu = res.data;
        setSlides(menu || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching slides:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Spin size="large" />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  return (
    <div className="container">
      <div
        style={{
          borderRadius: "0px 0px 7px 7px",
        }}
        className="relative sliderBorder w-full h-[55vh] sm:h-[67vh] md:h-[80vh] lg:h-[90vh] xl:h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 w-full z-30">
          <Header />
        </div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover sliderSize bg-center transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.bacgroundImg})`,
                zIndex: "-1",
              }}
            ></div>

            {/* Dark gradient on the left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#201f31] to-transparent opacity-60"></div>

            {/* Full Slide Darkness Overlay */}
            <div
              className="absolute inset-0 bg-[#201f31] opacity-40"
              style={{ zIndex: "0" }}
            ></div>

            {/* Slide Content */}
            <div className="relative z-10 text-white px-4 md:px-12">
              <div className="media">
                <div className="widdf">
                  <h3 className="titfd text-xl sm:text-2xl md:text-3xl">
                    {slide.name}
                  </h3>

                  {/* Date and Time (hidden on mobile) */}
                  <div className="flex gap-8 mt-6 sm:mt-1 flex-wrap">
                    <button className="flex items-center gap-2 text-sm sm:text-base ">
                      <CiCalendarDate className="size-[20px]" />
                      {slide.data}
                    </button>
                    <button className="flex items-center gap-2 text-sm sm:text-base ">
                      <FaPlayCircle />
                      TV
                    </button>
                    <button className="flex items-center gap-1 text-sm sm:text-base ">
                      <IoTimeSharp className="size-[19px] text-white" />
                      {slide.time}
                    </button>
                  </div>

                  <hr className="mt-4" />

                  {/* Description (hidden on mobile) */}
                  <p className="mt-4 hidden md:block font-normal text-white leading-6 tracking-normal subttile text-sm sm:text-base">
                    {slide.desc}
                  </p>

                  {/* Watch Button */}
                  <div className="mt-4 flex items-center gap-4 sm:gap-1 flex-wrap">
                    <Link to={`details/${slide.id}`}>
                      <button className="flex items-center gap-2 watchBtn">
                        <FaPlayCircle className="transition-transform duration-500 ease-in-out hover:rotate-360" />
                        Ko'rish
                      </button>
                    </Link>

                    <button className="flex items-center sm:ms-0 ms-2 gap-2 bacgroountrans p-2 rounded-xl px-4 group">
                      favorites
                      <FaAngleRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div
          style={{
            flexDirection: "column",
          }}
          className="absolute bottom-4 right-4 flex gap-2 sm:gap-1 z-30"
        >
          {/* Visible only on medium and large screens */}
          <div className="sm:flex hidden flex-col justify-center items-center gap-2">
            <button
              onClick={handlePrevSlide}
              className="bg-gray-600  bg-opacity-70 text-white p-2 rounded-lg hover:bg-opacity-90"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextSlide}
              className="bg-gray-600  bg-opacity-70 text-white p-2 rounded-lg hover:bg-opacity-90"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
