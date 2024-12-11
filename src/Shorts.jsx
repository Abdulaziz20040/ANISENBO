import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import { shorts } from "./Api/Api";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

function Shorts() {
  const [shortsData, setShortsData] = useState([]); // Changed state name to shortsData
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state
  const videoRef = useRef(null); // Defined the videoRef

  useEffect(() => {
    axios
      .get(shorts)
      .then((res) => {
        setShortsData(res.data);
        const randomIndex = Math.floor(Math.random() * res.data.length);
        setCurrentIndex(randomIndex);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching shorts:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Navigate to the previous video
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : shortsData.length - 1
    );
  };

  // Navigate to the next video
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < shortsData.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="container mx-auto">
      <Header />
      <div className="mt-[60px] flex justify-center items-center relative">
        {/* Left Arrow Icon */}
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={handlePrev}
            className="text-3xl text-gray-600 hover:text-black p-4"
          >
            <FaAngleLeft />
          </button>

          {/* Video Display */}
          {loading ? (
            <div>Loading...</div> // Show loading message until data is loaded
          ) : shortsData.length > 0 ? (
            <iframe
              key={currentIndex}
              ref={videoRef}
              width="369"
              height="656"
              src={`${shortsData[currentIndex]?.iframe}?enablejsapi=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ borderRadius: "15px" }}
            ></iframe>
          ) : (
            <div>No Shorts Available</div> // Show if no data is available
          )}

          {/* Right Arrow Icon */}
          <button
            onClick={handleNext}
            className="text-3xl text-gray-600 hover:text-black p-4"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shorts;
