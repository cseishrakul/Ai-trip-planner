import React from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place, imageUrl }) => {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border rounded-xl mt-2 p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={imageUrl}
          className="w-[130px] h-[130px] ropunded-xl"
          alt=""
        />
        <div className="">
          <h2 className="font-medium text-lg"> {place?.placeName} </h2>
          <p className="text-gray-400">
            {" "}
            {place?.["Place Details"]?.slice(0, 80)}{" "}
          </p>
          <p className="text-dark font-bold">
            {" "}
            Time to Travel: ⏲️ {place?.["Time t travel"]}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
