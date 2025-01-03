import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { aniDubApi } from "../../Api/Api";
import Header from "../../components/Header";
import "./Detals.css";
import { Skeleton } from "antd";
import { useProduct } from "../../context/Context";
import { IoPlayOutline } from "react-icons/io5";
import { FaPlayCircle, FaRegBookmark } from "react-icons/fa";
import { MdOutlineDownload } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

// Comments Component
function Comments({ item }) {
  if (!item?.comments?.length) {
    return <p>Hozircha izohlar yo'q.</p>;
  }
  return (
    <div>
      {item.comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
    </div>
  );
}

function Details() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToFavorite, favorite, deleteFromFavorite } = useProduct();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerRow = 5;

  const handleNextClick = () => {
    if (item?.episode?.[0]) {
      const totalImages = Object.values(item.episode[0]).length;
      if (currentIndex + imagesPerRow < totalImages) {
        setCurrentIndex(currentIndex + imagesPerRow);
      }
    }
  };

  const handleFavorite = (item) => {
    const isAdded = addToFavorite(item);
    const isInFavorites = favorite.some((fav) => fav.id === item.id);

    if (isInFavorites) {
      deleteFromFavorite(item.id);
    } else {
      addToFavorite(item);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`${aniDubApi}/${id}`)
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ma'lumotni olishda xato:", error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className=" container">
        <div className="flex justify-between items-center mb-4">
          <Skeleton rows={4} />
          <Skeleton rows={4} />
          <Skeleton rows={4} />
          <Skeleton rows={4} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Ma'lumotni yuklashda xato yuz berdi!</div>;
  }

  return (
    <div className="">
      <div className="">
        <Header />
        <div className=" container mt-20">
          {/* details header */}
          <div className=" flex items-start justify-center gap-6">
            <div className=" relative">
              <img
                style={{
                  width: "1100px",
                  height: "550px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
                src={item.bacgroundImg}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#201f31a3] to-transparent opacity-60"></div>
              <FaPlayCircle className=" absolute top-[44%] left-[48%] size-[60px]" />
            </div>
            {/* desc */}
            <div>
              <h1 className=" mb-5">1 qism 1 mavsum</h1>
              <h1 className=" line-clamp-2 max-w-[200px] mb-3">{item.name}</h1>
              <p>Ko'rishlar soni : {item.eye}</p>
              <p>Rejissor : {item.Director}</p>
              <p>Janri : {item.genre}</p>
              <p>Yili : {item.data}</p>

              <div className=" flex items-center gap-3 mt-3">
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full">
                  Fullhd
                </button>
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full">
                  HD
                </button>
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full">
                  1080
                </button>
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full">
                  720
                </button>
              </div>

              <div className=" flex items-center gap-3 mt-5">
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full flex items-center gap-2">
                  <IoPlayOutline className=" text-white" />
                  <p>Treyler</p>
                </button>
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full">
                  <FaRegBookmark />
                </button>
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full">
                  <MdOutlineDownload />
                </button>
                <button className=" bg-[#7E7E7E45] py-1 px-4 rounded-full">
                  <FaRegShareFromSquare />
                </button>
              </div>

              <p className=" mt-4 max-w-[300px] line-clamp-5 text-stone-400">
                {item.desc}
              </p>
            </div>
          </div>

          {/* details qisimlar */}

          <div className="flex items-center mb-4">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <h2 className="text-xl font-semibold text-white">1 Fasl</h2>
          </div>
          <hr />

          <div>
            {/* <VideoPlayer videoUrl={item.videoUrl} /> */}
            <h1>Qismlar mavjud emas</h1>
          </div>
          {/* episode */}

          <div className="flex items-center mb-4">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <h2 className="text-xl font-semibold text-white">Kadrlar</h2>
          </div>
          <>
            <div className="flex items-center gap-4">
              {item?.episode?.[0] ? (
                <>
                  <div className="flex overflow-hidden gap-4">
                    {Object.values(item.episode[0])
                      .slice(currentIndex, currentIndex + imagesPerRow)
                      .map((epi, index) => (
                        <div
                          key={index}
                          className="group relative w-[300px] h-[160px] sm:h-[180px] overflow-hidden rounded-lg shadow-md bg-gray-200"
                        >
                          <img
                            src={epi}
                            alt={`episode ${currentIndex + index + 1}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center"></div>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={handleNextClick}
                    className="ml-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    <FaArrowRight />
                  </button>
                </>
              ) : (
                <p className="text-gray-500 italic col-span-full text-center">
                  Epizodlar mavjud emas.
                </p>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default Details;
