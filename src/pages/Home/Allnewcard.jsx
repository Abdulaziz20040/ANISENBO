import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";
import { aniDubApi } from "../../Api/Api";

function Allnewcard() {
  const [data, setData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalPosition, setModalPosition] = useState("right");

  useEffect(() => {
    axios
      .get(aniDubApi)
      .then((res) => {
        const validData = res.data.filter(
          (item) => item.data && !isNaN(new Date(item.data))
        );

        const sortedData = validData.sort(
          (a, b) => new Date(b.data) - new Date(a.data)
        );

        const latestDate =
          sortedData.length > 0 ? new Date(sortedData[0].data) : null;

        const latestData = sortedData.filter(
          (item) => new Date(item.data).getTime() === latestDate.getTime()
        );

        setData(latestData);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
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
    <div className="container mt-0">
      {/* Card header */}
      <div className="flex justify-between items-center mt-10 mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <h2 className="text-xl font-semibold text-white">Chiqarilmoqda</h2>
          </div>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="max-w-[210px] max-h-[290px] relative cursor-pointer group mb-16"
          >
            {/* News Button */}
            <button className="newBtn absolute top-2 left-2 w-[55px] z-0">
              News
            </button>

            {/* Image */}
            <Link to={`/details/${item.id}`}>
              <div>
                <img
                  className="w-full h-[200px] md:h-[290px] rounded-lg object-cover"
                  src={item.img}
                  alt={item.title}
                />

                {/* Title */}
                <h2 className="text-start mt-1 font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis -tracking-2">
                  {item.name}
                </h2>
                <h2 className="text-start text-sm font-semibold text-stone-400 overflow-hidden whitespace-nowrap text-ellipsis line-clamp-3">
                  {item.desc}
                </h2>
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
            {/* Hover Overlay */}

            {/* Modal */}
            {hoveredItem === item && (
              <div
                className={`absolute -top-16 ${
                  modalPosition === "left" ? "right-8" : "left-full"
                } bacgroountrans ms-4 text-white p-6 w-[280px] rounded-xl shadow-2xl z-20 border border-gray-200`}
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={handleMouseLeave}
              >
                <h2 className="text-2xl font-semibold mb-3">
                  <Link
                    to={`/details/${item.id}`}
                    className="hover:text-blue-200"
                  >
                    <q>{item.name}</q>
                  </Link>
                </h2>

                <p className=" text-sm leading-relaxed overflow-y-auto h-[120px] custom-scrollbar mb-4">
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

export default Allnewcard;
