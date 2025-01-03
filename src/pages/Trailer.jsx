import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { aniDubApi } from "../Api/Api";

const Trailer = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(aniDubApi)
      .then((res) => {
        const filterdate = res.data.filter((item) => item.trailer === true);
        setPosts(filterdate);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  const getDisplayedPosts = () => {
    if (posts.length <= 5) return posts;

    const end = currentIndex + 5;
    if (end <= posts.length) {
      return posts.slice(currentIndex, end);
    }

    return [
      ...posts.slice(currentIndex),
      ...posts.slice(0, end - posts.length),
    ];
  };

  return (
    <div className="container mt-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
          <h2 className="text-xl font-semibold text-white">Trailerlar</h2>
        </div>
        <div className="flex justify-between items-center gap-5">
          <button
            className="border-none bg-transparent  text-gray-500"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
          <button
            className="border-none bg-transparent text-gray-500"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
        {getDisplayedPosts().map((post, index) => (
          <div
            key={post.id}
            className={`rounded-lg overflow-hidden transition-shadow duration-300 transform opacity-75 hover:opacity-100 hover:scale-110 hover:brightness-105`}
            style={{
              boxShadow: "0px 0px 32px 0px #00000012",
              transition: "opacity 3s ease, transform 1s ease, filter 0s ease",
            }}
          >
            <Link to={`/details/${post.id}`}>
              <img
                src={post.bacgroundImg}
                className="w-full h-[200px] object-cover rounded-lg"
                style={{
                  transition: "transform 1s ease, opacity 1s ease",
                }}
                alt={post.title || "Image"}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailer;
