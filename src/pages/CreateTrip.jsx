import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/option";
import { chatSession } from "@/service/AiModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [days, setDays] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravelWith, setSelectedTravelWith] = useState(null);
  const [openDialog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedPlace(null);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    const apiKey = "pk.b4f1bfd6cf500f1c29a2f2235f989d58";
    const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${query}&format=json`;
    try {
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setSelectedPlace(place);
    setQuery(place.display_name);
    setSuggestions([]);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) {
      setOpendialog(true);
      return;
    }

    if (!selectedPlace) {
      alert("Please select a location from suggestions");
      return;
    }
    if (!days || !selectedBudget || !selectedTravelWith) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      selectedPlace.display_name
    )
      .replace("{totalDays}", days)
      .replace("{traveler}", selectedTravelWith)
      .replace("{budget}", selectedBudget);

    // console.log("Submitting trip with location:", {
    //   location: selectedPlace,
    //   days,
    //   budget: selectedBudget,
    //   travelWith: selectedTravelWith,
    // });

    // console.log("Final Prompt to send to AI:", FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    SaveAiTrip(result?.response?.text());
    setLoading(false);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log("User info:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpendialog(false);
        handleSubmit();
      })
      .catch((error) => {
        console.error("Error fetching user info", error);
      });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: {
        location: selectedPlace,
        days,
        budget: selectedBudget,
        travelWith: selectedTravelWith,
      },
      tripData: JSON.parse(TripData),
      useEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences ⛵🌲
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <form onSubmit={handleSubmit} className="mt-20">
        <div className="my-10">
          <h2 className="text-xl my-3 font-medium">
            What is your destination choice?
          </h2>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter a location"
            className="w-full p-2 border rounded-md"
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 border rounded-md max-h-60 overflow-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="my-10">
          <h2 className="my-3"> How many days you wanna stay </h2>
          <Input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Ex.3"
          />
        </div>
        <div className="my-3">
          <h2 className="text-2xl font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 my-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  selectedBudget === item.title
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedBudget(item.title)}
              >
                <h2 className="text-4xl"> {item.icon} </h2>
                <h2 className="font-bold text-lg"> {item.title} </h2>
                <h2 className="text-sm text-gray-500"> {item.desc} </h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10">
          <h2 className="text-2xl font-medium">
            What do you plan on travelling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 my-5">
            {SelectTravelesList.map((item, index) => (
              <div
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  selectedTravelWith === item.title
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedTravelWith(item.title)}
              >
                <h2 className="text-4xl"> {item.icon} </h2>
                <h2 className="font-bold text-lg"> {item.title} </h2>
                <h2 className="text-sm text-gray-500"> {item.desc} </h2>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <LuLoaderCircle className="h-7 w-7 animate-spin" />
        ) : (
          <Button type="submit" className="cursor-pointer mb-10">
            {" "}
            Generate Trip{" "}
          </Button>
        )}

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <h3 className="font-bold text-emerald-700">Ai Trip Planner</h3>
                <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                <p className="font-bold">
                  {" "}
                  Sign in to the app with Google Authentication{" "}
                </p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center cursor-pointer"
                >
                  {" "}
                  <FcGoogle /> Sign in with google{" "}
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
};

export default CreateTrip;
