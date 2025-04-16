import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import PlaceCard from "./PlaceCard";

const PlaceToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary
    ? Object.entries(trip?.tripData?.itinerary)
    : [];
  return (
    <div className="my-5">
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div className="">
        {itinerary.map(([Day, places], index) => (
          <PlaceCard key={index} Day={Day} places={places} />
        ))}
      </div>
    </div>
  );
};

export default PlaceToVisit;
