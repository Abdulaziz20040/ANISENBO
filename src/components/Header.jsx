import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Drawer } from "antd";
import "../App.css";
import { IoChatboxEllipses, IoDuplicate, IoSearch } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import "./header.css";
import { aniDubApi, shorts } from "../Api/Api";

function Header() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const username = localStorage.getItem("name");

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      try {
        const response = await fetch(`${aniDubApi}?name=*${e.target.value}`);
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(aniDubApi)
      .then((res) => {
        const filterData = res.data
          .map((item) => {
            return {
              categoryName: item.categoryName,
            };
          })
          .filter((item) => item.categoryName);
        setData(filterData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data: ", error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`fixed px-2   top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "hoberBgHeader shadow-xl" : "bg-transparent"
        }`}
      >
        <div className="container mt-2 ">
          {/* Desktop Menu */}
          <ul className="flex  gap-10 mx-auto text-white font-semibold items-center justify-between hidden lg:flex">
            <div className=" flex items-center gap-10">
              {/* logo */}
              <Link to="/">
                <li className="cursor-pointer">
                  <img
                    className=" HeaderLogo"
                    src="https://anilife.vercel.app/static/media/aniDub_logo.68c1d6b51d579e3f658b.png"
                    alt="Logo"
                  />
                </li>
              </Link>
              {/* janrlar */}
              <div className="relative cursor-pointer group ms-10">
                <li className="cursor-pointer text-center flex flex-col items-center">
                  <IoDuplicate className="text-[#e96fae] size-[18px] hover:animate-bounce" />
                  <span>Janrlar</span>
                </li>
                <div
                  className="
        absolute left-0 mt-2 bg-blue-300
        w-0 h-0 opacity-0 overflow-hidden 
        transition-all duration-500 ease-in-out 
        group-hover:w-[440px] group-hover:h-auto px-3 py-3 flex flex-wrap gap-3 group-hover:opacity-100 rounded-lg
      "
                >
                  {data.map((item) => (
                    <div key={item.categoryName}>
                      <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                      <div className="relative z-10">{item.categoryName}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* chat */}
              <Link to={"/chat"}>
                <li className="cursor-pointer text-center flex flex-col items-center">
                  <IoChatboxEllipses className="text-[#e96fae] size-[18px] hover:animate-bounce" />
                  <span>Chat</span>
                </li>
              </Link>

              {/* shorts */}
              <Link to={"/edit"}>
                <li className="cursor-pointer text-center flex flex-col items-center">
                  <SiYoutubeshorts className="text-[#e96fae] size-[18px] hover:animate-bounce" />
                  <span>Edit</span>
                </li>
              </Link>
              <li
                ref={wrapperRef}
                className="flex items-center space-x-2 relative"
              >
                {/* Search Input */}
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Izlang..."
                    style={{
                      marginLeft: "30px",
                    }}
                    className={`  search-input transform focus:outline-none transition-transform duration-300`}
                  />
                  <div className=" absolute top-0 -right-306">
                    {searchTerm && searchResults.length > 0 && (
                      <div
                        className="seachContainer overflow-y-auto"
                        style={{
                          height: "auto",
                          maxHeight: "290px",
                          backgroundColor: "#1e1e1e",
                          overflowY: "scroll",
                          scrollbarWidth: "thin",
                          scrollbarColor: "#00F0FF #1e1e1e",
                        }}
                      >
                        {searchResults.map((result) => (
                          <Link to={`/details/${result.id}`}>
                            <div
                              key={result.id}
                              className="flex items-center p-2 gap-2"
                            >
                              <div
                                style={{
                                  width: "60px", // Set a fixed width
                                  height: "60px", // Set a fixed height
                                  cursor: "pointer",
                                }}
                              >
                                <img
                                  style={{
                                    width: "100%", // Ensure the image scales to the container width
                                    height: "100%", // Ensure the image scales to the container height
                                    overflow: "hidden",
                                    borderRadius: "10px",
                                  }}
                                  src={result.img}
                                  alt={result.name}
                                />
                              </div>
                              <span className="text-white">{result.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </div>

            <div className="flex items-end gap-4">
              <li>
                {username ? (
                  <Link to={"/profil"}>
                    <button
                      style={{
                        backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                        backgroundSize: "cover",
                        borderRadius: "20px",
                        width: "140px",
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
                    >
                      profil
                      <TbLogin2 className="text-xl" />
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button
                      style={{
                        backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                        backgroundSize: "cover",
                        borderRadius: "20px",
                        width: "140px",
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
                    >
                      Kirish
                      <TbLogin2 className="text-xl" />
                    </button>
                  </Link>
                )}
              </li>
            </div>
          </ul>

          {/* Mobile Menu */}
          <div className="lg:hidden flex justify-between items-center">
            <Link to={"/"}>
              <img
                className="w-[140px] h-[40px]"
                src="https://anilife.vercel.app/static/media/aniDub_logo.68c1d6b51d579e3f658b.png"
                alt="Logo"
              />
            </Link>

            <button onClick={showDrawer} className="text-white text-2xl">
              ☰
            </button>
          </div>

          {/* Drawer Menu Items */}
          <Drawer
            placement="left"
            onClose={onClose}
            visible={open}
            width={280}
            className="z-50 "
            closable={false}
            style={{
              backgroundColor: "rgba(111, 66, 193, 0.1)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              transition: "all 0.3s ease",
              border: "none",
              color: "wheat",
            }}
          >
            <ul className="flex flex-col gap-4">
              <div className=" flex gap-16">
                <div className="relative cursor-pointer group">
                  <li className="cursor-pointer text-center flex flex-col items-center">
                    <IoDuplicate className="text-[#e96fae] size-[20px] hover:animate-bounce" />
                    <span>Janrlar</span>
                  </li>{" "}
                  <div
                    className="
        absolute left-0 mt-2 bg-blue-300
        w-0 h-0 opacity-0 overflow-hidden 
        transition-all duration-500 ease-in-out 
        group-hover:w-[200px] group-hover:h-[300px] group-hover:opacity-100
      "
                  >
                    {data.map((item) => (
                      <div
                        key={item.categoryName}
                        className="relative p-4 bg-gradient-to-br from-indigo-600 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out"
                      >
                        <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                        <div className="relative z-10">{item.categoryName}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to={"chat"}>
                  <li className="cursor-pointer text-center flex flex-col items-center">
                    <IoChatboxEllipses className="text-[#e96fae] size-[20px] hover:animate-bounce" />
                    <span>Chat</span>
                  </li>
                </Link>

                <Link to={"shorts"}>
                  <li className="cursor-pointer text-center flex flex-col items-center">
                    <SiYoutubeshorts className="text-[#e96fae] size-[20px] hover:animate-bounce" />
                    <span>Shorts</span>
                  </li>
                </Link>
              </div>

              {/* search */}
              <li>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Izlang..."
                  className={` search-input  transform focus:outline-none transition-transform duration-300 `}
                />
              </li>
              {/* profil */}
              <li>
                {username ? (
                  <Link to={"profil"}>
                    <button
                      style={{
                        backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                        backgroundSize: "cover",
                        borderRadius: "20px",
                        width: "140px",
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
                    >
                      profil
                      <TbLogin2 className="text-xl" />
                    </button>
                  </Link>
                ) : (
                  <Link to="login">
                    <button
                      style={{
                        backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                        backgroundSize: "cover",
                        borderRadius: "20px",
                        width: "140px",
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
                    >
                      Kirish
                      <TbLogin2 className="text-xl" />
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Header;
