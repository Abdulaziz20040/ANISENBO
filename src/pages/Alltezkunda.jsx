import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmarkPlus, CiCircleInfo, CiHeart } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";
import { aniDubApi } from "../Api/Api";
import { useProduct } from "../context/Context";
import { AiOutlineArrowRight } from "react-icons/ai";

function Alltezkunda() {
  const [data, setData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalPosition, setModalPosition] = useState("right");

  useEffect(() => {
    axios.get(aniDubApi).then((res) => {
      const filterDate = res.data.filter((item) => item.Tezkunda === true);
      setData(filterDate);
    });
  }, []);

  const handleMouseEnter = (item, index) => {
    // Calculate the modal position
    const card = document.getElementById(`card-${index}`);
    if (card) {
      const cardRect = card.getBoundingClientRect();
      if (cardRect.right + 300 > window.innerWidth) {
        setModalPosition("left");
      } else {
        setModalPosition("right");
      }
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="container mt-5  flex flex-col justify-center">
      <div className="flex justify-between items-center mt-2 mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <h2 className="text-xl font-semibold text-white">Tezkunda</h2>
          </div>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="max-w-[200px] max-h-[270px] relative cursor-pointer group mb-14"
          >
            {/* News Button */}

            {/* Image */}
            <Link to={`details/${item.id}`}>
              <div>
                <img
                  className="w-full h-[200px] md:h-[270px] rounded-[13px] object-cover"
                  src={item.img}
                  alt={item.title}
                />

                {/* Title */}
                <h2 className="text-start mt-1 font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis -tracking-2">
                  «{item.name}»
                </h2>
                <p className=" line-clamp-1 text-stone-300 text-[13px]">
                  {item.desc}
                </p>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {/* Info Icon */}
                  <div
                    className="absolute top-0 right-[-10px] px-2 py-2 text-black cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(item, index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <CiCircleInfo className="text-2xl text-white" />
                  </div>

                  {/* Play Icon */}
                  <button className="text-white">
                    <GoPlay className="text-white text-6xl transform transition-transform duration-300 group-hover:-translate-y-2" />
                  </button>
                </div>
              </div>
            </Link>

            {/* Modal */}
            {hoveredItem === item && (
              <div
                className={`absolute -top-16 ${
                  modalPosition === "left" ? "right-8" : "left-full"
                } bacgroountrans ms-2 text-white p-6 w-[280px] rounded-xl shadow-2xl z-20 border border-gray-200`}
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className=" w-full flex items-start justify-between">
                  <h2 className="text-2xl font-semibold mb-3">
                    <q>{item.name}</q>
                  </h2>
                </div>
                <p className=" text-sm leading-relaxed overflow-y-auto h-[120px] custom-scrollbar mb-6">
                  {item.desc}
                </p>

                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Ko'rishlar:</span>
                    {item.eye}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Rejissyor:</span>
                    {item.Director}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Qisimlar:</span>
                    {item.NumberParts}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Davlati:</span>
                    {item.Country}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Yili:</span> {item.data}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alltezkunda;
