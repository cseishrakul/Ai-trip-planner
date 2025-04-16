import { GetUnsplashImage } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({hotel}) => {
    const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetHotelImage = async () => {
      const query = hotel?.HotelName || hotel?.["Hotel Address"];
      if (query) {
        const imgUrl = await GetUnsplashImage(query);
        setImageUrl(imgUrl);
      }
    };
    fetHotelImage()
  },[hotel]);
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.HotelName} ${hotel?.["Hotel Address"]}`}
      target="_blank"
    >
      <div className="hover:scale-105 transiton-all cursor-pointer">
        <img src={imageUrl || '/placeholder.jpg'} className="rounded-xl" alt="" />
        <div className="">
          <h2 className="font-medium"> {hotel?.HotelName} </h2>
          <h2 className="text-xs text-gray-500">
            📍 {hotel?.["Hotel Address"]}{" "}
          </h2>
          <h2 className="text-xs font-bold text-dark">💰 {hotel?.Price} </h2>
          <h2 className="text-xs font-bold text-dark">⭐ {hotel?.rating} </h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
