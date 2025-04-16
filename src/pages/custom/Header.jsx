import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5 py-5">
      <Link to="/">
        <p className="font-bold text-3xl text-emerald-800">Trip Planner</p>
      </Link>
      <div className="">
        {user ? (
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  alt=""
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button className="cursor-pointer">Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
