import React, { useEffect, useState } from "react";
import "../../App.css";
import userDefaultimg from "../../Img/userDefaultimg.png";
import axios from "axios";
import { profilBacgrounimg, userDate } from "../../Api/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./profil.css";

function Profil() {
  const [activTab, setActiveTab] = useState("profil");
  const [data, setData] = useState([]);
  const [galeriyadata, setGaleriyadata] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const userImg =
    localStorage.getItem("userImg") ||
    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg";

  const userName = localStorage.getItem("name");

  const userBackgroundImg =
    localStorage.getItem("backgroundimg") ||
    "https://wallpapergod.com/images/hd/anime-4k-4133X2480-wallpaper-x67k5n46g87lwxkb.jpeg";

  const userPassword = localStorage.getItem("password");

  useEffect(() => {
    axios
      .get(userDate)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log("Error fetching user data: ", e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(profilBacgrounimg)
      .then((res) => {
        setGaleriyadata(res.data);
      })
      .catch((e) => {
        console.log("Error fetching user data: ", e);
      });
  }, []);

  return (
    <div className="">
      <div className="container">
        {/* Profil header */}
        <div
          className="relative"
          style={{
            backgroundImage: `url(${userBackgroundImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
            height: "45vh",
          }}
        >
          <div className="absolute bottom-0 left-0">
            <div className="flex justify-center items-center">
              <img
                src={userDefaultimg}
                alt="userDefaultimg"
                className="rounded-full w-[100px] h-[100px] cursor-pointer object-cover"
              />
              <p className="text-[25px]">{userName}</p>
            </div>
          </div>
        </div>
        {/* Profil content */}
        <div className=" relative mt-14">
          <div className="flex space-x-4 mb-4 absolute right-0 -bottom-1">
            {/* Add space between buttons */}
            {["profil", "sevimlilar", "galeriya"].map((tab) => {
              return (
                <button
                  key={tab}
                  className={`cursor-pointer px-4 py-2 duration-500 relative inline-block  text-decoration-none rounded-full transform transition-all ease-in-out ${
                    activTab === tab
                      ? "btn-white activeTabSty"
                      : "btn-white activeTabdefault"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  <span className="btn::after absolute top-0 left-0 w-full h-full rounded-full z-[-1] transition-all duration-400"></span>
                </button>
              );
            })}
          </div>
          <hr />
        </div>

        {activTab === "profil" && (
          <div className="overflow-y-auto h-[47vh] scrollbar-hide">
            <div className="flex items-center gap-8 flex-wrap mt-4">
              {/* User Image Section */}
              <div className="relative">
                <img
                  src={userImg}
                  alt="userImg not defined"
                  className="rounded-xl w-[200px] h-[246px] object-cover shadow-2xl"
                />
                {/* Add/Edit User Image */}
                <div className="w-[70px] absolute top-44 right-0">
                  <img
                    className="w-full cursor-pointer transition-transform duration-300 hover:scale-110 hover:translate-y-[-3px] rounded-full "
                    src={userDefaultimg}
                    alt="User"
                  />
                </div>
              </div>

              {/* User Info Section */}

              <div>
                <h1 className="text-xl font-semibold text-white">{userName}</h1>
                <h1 className="text-xl font-semibold text-white">
                  {userPassword}
                </h1>
                <p className="text-sm text-gray-400">
                  {data.email} - {data.birthdate}
                </p>
              </div>

              {/* calendar */}

              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="p-4 mt-2 w-full rounded-xl shadow-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-lg font-medium text-gray-800 bg-white transition-all ease-in-out duration-300"
                  inline
                />
              </div>
            </div>
          </div>
        )}

        {/* Sevimlilar content */}
        {activTab === "sevimlilar" && (
          <div className="overflow-y-auto h-[47vh] scrollbar-hide">
            <div className="mt-4">
              <div>Sevimlilar</div>
            </div>
          </div>
        )}

        {/* Galeriya content */}
        {activTab === "galeriya" && (
          <div className="overflow-y-auto h-[47vh] scrollbar-hide">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-4">
              {galeriyadata.map((item) => {
                return (
                  <div key={item.id} className="relative mb-14">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover cursor-pointer group"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profil;
