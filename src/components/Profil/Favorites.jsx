import React, { useState } from "react";
import { useProduct } from "../../context/Context";
import { Link } from "react-router-dom";
import { CiBookmarkPlus, CiCircleInfo } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

function Favorites() {
  const { favorite, deleteFromFavorite } = useProduct();
  const handleDelet = (item) => {
    deleteFromFavorite(item.id);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorite.map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="max-w-[200px] max-h-[270px] relative cursor-pointer group mb-14"
          >
            {/* News Button */}

            {/* Image */}
            <div>
              <Link to={`/details/${item.id}`}>
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
              </Link>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Info Icon */}
                <div
                  onClick={() => handleDelet(item)}
                  className="absolute top-0 right-[-35px] px-2 py-2 text-black cursor-pointer"
                >
                  <MdDeleteOutline className="text-2xl text-white" />
                </div>

                {/* Play Icon */}
                <Link to={`/details/${item.id}`}>
                  <button className="text-white">
                    <GoPlay className="text-white text-6xl transform transition-transform duration-300 group-hover:-translate-y-2" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
