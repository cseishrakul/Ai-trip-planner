import React from "react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-emerald-800">
          Discover Your Next Adventure with AI
        </span>{" "}
        : Personalized Itineraries at Your Fingertips
      </h1>
      <p className="font-semibold">
        Your personal tour planner and travel curator,creating custom
        Itineraries tailored to your interests and budget.
      </p>
      <Link to="/create-trip">
        <Button className="cursor-pointer">Let's start its free</Button>
      </Link>
    </div>
  );
};

export default Hero;
