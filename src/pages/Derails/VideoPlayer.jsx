import React, { useState } from "react";
import "../../App.css";

const VideoPlayer = ({ item }) => {
  const [selectedVideo, setSelectedVideo] = useState(
    item.series && item.series.length > 0 ? item.series[0].one : null
  );

  // Agar video ro'yxati mavjud bo'lmasa
  if (!item.series || item.series.length === 0) {
    return <div>Video mavjud emas</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Video Display Section */}
      <div className="md:w-[780px] w-full mb-4 md:mb-0">
        {selectedVideo && (
          <div className="w-full">
            <iframe
              src={selectedVideo}
              className="rounded-lg focus:outline-none"
              style={{ width: "100%", height: "510px", border: "none" }}
            ></iframe>
          </div>
        )}
      </div>

      {/* Series Buttons Section */}
      <div className="overflow-y-auto w-[231px] h-[440px] md:h-[510px]">
        <div className=" flex flex-wrap gap-2">
          {Object.entries(item.series[0]).map(([key, url], index) => (
            <button
              className=" bacgrooundDetals text-white w-[80px] h-[45px] rounded-lg md:w-[100px] md:h-[50px] transition-all"
              key={key}
              onClick={() => setSelectedVideo(url)}
            >
              {`${index + 1}-Qism`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
