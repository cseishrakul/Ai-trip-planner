import { GetUnsplashImage } from "@/service/GlobalAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

const Hotel = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl my-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <HotelCard  hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotel;
