import { Button } from "@/components/ui/button";
import { GetUnsplashImage } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";

const InfoSection = ({ trip }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const query = trip?.userSelection?.location?.display_name;
    if (!query) {
      return;
    }

    const fetchImageUrl = await GetUnsplashImage(query);
    if (fetchImageUrl) {
      setImageUrl(fetchImageUrl);
    } else {
      console.log("No image found!");
    }
  };

  return (
    <div>
      <img
        src={imageUrl}
        className="w-full h-[400px] object-cover rounded-md"
        alt=""
      />
      <div className="my-5">
        <h2 className="font-bold">
          {" "}
          {trip?.userSelection?.location?.display_name}{" "}
        </h2>
      </div>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-5 mt-2">
          <h3 className="p-1 px-3 bg-gray-200 rounded-full text-dark text-xs md:text-md font-bold">
            📅 {trip?.userSelection?.days} Days
          </h3>
          <h3 className="font-bold p-1 px-3 bg-gray-200 rounded-full text-dark text-xs md:text-md">
            💸 {trip?.userSelection?.budget} Budget
          </h3>
          <h3 className="font-bold p-1 px-3 bg-gray-200 rounded-full text-dark text-xs md:text-md">
            👥 {trip?.userSelection?.travelWith}{" "}
          </h3>
        </div>
        <Button className="ml-auto mt-2 md:mt-0 cursor-pointer">
          {" "}
          <FaLocationArrow />{" "}
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
