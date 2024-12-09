import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import VideoPlayer from "./VideoPlayer";
import { aniDubApi } from "../../Api/Api";
import Header from "../../components/Header";
import "./Detals.css";
import { Skeleton } from "antd";

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
  const [activeTab, setActiveTab] = useState("izohlar");

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
        <div>
          <div className="container mt-20">
            {/* Details Header */}
            <div
              style={{
                backgroundImage: `url(${item.bacgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "start",
                backgroundRepeat: "no-repeat",
              }}
              className="flex flex-col lg:flex-row gap-4 mt-6 py-4 px-2 shadow-lg rounded-lg"
            >
              {/* Info Section */}
              <div className="w-full lg:w-[300px] bacgrooundDetals p-4 text-white rounded-lg flex-shrink-0">
                <h2 className="text-2xl font-semibold text-[#47dae4] tracking-wide border-b-2 pb-2 border-[#47dae4] mb-4">
                  {item?.name || "Noma'lum"}
                </h2>
                <p className=" text-sm leading-relaxed tracking-wide overflow-y-auto h-[200px] custom-scrollbar mb-6">
                  {item?.desc}
                </p>

                <div className="space-y-2 ">
                  <p>
                    <span className="font-medium text-[#00F0FF]">
                      Ko'rishlar soni:{" "}
                    </span>
                    {item?.eye || "Ma'lumot mavjud emas"}
                  </p>
                  <p>
                    <span className="font-medium text-[#00F0FF]">
                      Rejissor:{" "}
                    </span>
                    {item?.Director || "Ma'lumot mavjud emas"}
                  </p>
                  <p>
                    <span className="font-medium text-[#00F0FF]">Yili: </span>
                    {item?.data || "Ma'lumot mavjud emas"}
                  </p>
                  <p>
                    <span className="font-medium text-[#00F0FF]">Janr: </span>
                    {item?.genre || "Ma'lumot mavjud emas"}
                  </p>
                </div>
              </div>

              {/* Video Player */}
              <div className="flex-1 rounded-lg overflow-hidden shadow-md">
                <VideoPlayer item={item} />
              </div>
            </div>

            {/* Details Footer */}
            <div className="flex items-center gap-14 font-bold mt-6">
              {["izohlar", "kadrlar"].map((tab) => (
                <button
                  key={tab}
                  className={`cursor-pointer ${
                    activeTab === tab ? "text-[#00F0FF] underline" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="text-[#00F0FF]">{tab[0].toUpperCase()}</span>
                  {tab.slice(1)}
                </button>
              ))}
            </div>

            <hr className="my-4" />

            {/* Tab Content */}
            <div className="content mt-4 mb-6">
              {/* Izohlar */}
              {activeTab === "izohlar" && (
                <div>
                  <h3 className="text-lg font-bold">Izohlar:</h3>
                  <Comments item={item} />
                </div>
              )}
              {/* Kadrlar */}
              <div>
                {activeTab === "kadrlar" && (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
                      {item?.episode?.[0] ? (
                        Object.values(item.episode[0]).map((epi, index) => (
                          <div
                            key={index}
                            className="group relative w-full h-[160px] sm:h-[180px] overflow-hidden rounded-lg shadow-md bg-gray-200"
                          >
                            <img
                              src={epi}
                              alt={`episode ${index + 1}`}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center"></div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic col-span-full text-center">
                          Epizodlar mavjud emas.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
