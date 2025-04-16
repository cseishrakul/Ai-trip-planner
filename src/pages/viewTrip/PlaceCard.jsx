import { useEffect, useState } from "react";
import { GetUnsplashImage } from "@/service/GlobalAPI";
import PlaceCardItem from "./PlaceCardItem";

const PlaceCard = ({ index, Day, places }) => {
  const placesArray = places ? Object.entries(places) : [];

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (placesArray.length > 0) {
        const query = placesArray[0][1]?.placeName;
        if (query) {
          const fetchedImageUrl = await GetUnsplashImage(query);
          setImageUrl(fetchedImageUrl);
        }
      }
    };
    fetchImage();
  }, [places]);

  return (
    <div className="grid grif-cols-2 gap-5" key={index}>
      <h2 className="font-medium text-lg">{Day}</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {placesArray.map(([key, placeData], placeIndex) => (
          <div className="my-3" key={placeIndex}>
            <p className="text-emerald-800 font-bold">
              {placeData?.["Best Time to Visit"]}
            </p>
            <PlaceCardItem place={placeData} imageUrl={imageUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceCard;
