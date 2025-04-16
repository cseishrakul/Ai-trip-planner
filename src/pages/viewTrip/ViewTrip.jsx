import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "./InfoSection";
import PlaceToVisit from "./PlaceToVisit";
import Hotel from "./Hotel";

const ViewTrip = () => {
  const { tripId } = useParams();
  console.log("Received trip data:", tripId);
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AiTrips", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No Document Found");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };
  

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information section */}
      <InfoSection trip={trip} />
      {/* Hotel */}
      <Hotel trip={trip} />
      {/* Place to visit */}
      <PlaceToVisit trip={trip} />
    </div>
  );
};

export default ViewTrip;
