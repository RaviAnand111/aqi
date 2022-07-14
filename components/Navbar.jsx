import { BiCurrentLocation } from "react-icons/bi";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { FaSearchLocation } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
const pincode = require("pincode-lat-long");

function Navbar() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState({ long: "", lat: "" });
  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
    console.log(location);
  };
  const longLat = (event) => {
    event.preventDefault();
    setLocation({
      lat: pincode.getlatlong(pin).lat,
      long: pincode.getlatlong(pin).long,
    });
    console.log(location);
  };
  return (
    <div
      className={`flex justify-between ${
        darkMode ? "bg-[#15202b] text-white" : ""
      } h-14 w-full`}
    >
      <div
        className="text-3xl items-center flex font-bold cursor-pointer ml-6"
        onClick={() => {
          router.push("/");
        }}
      >
        aqi
      </div>
      <div className="flex">
        <div className="flex  items-center ">
          <BiCurrentLocation
            className="cursor-pointer  text-[#1d9bf0]"
            onClick={getCurrentLocation}
          />
        </div>
        <div className="flex mr-0">
          <form action="" className="flex items-center">
            <FaSearchLocation className="ml-3" />
            <input
              type="number"
              className="w-20 h-full outline-none bg-transparent text-lg text-center"
              value={pin}
              placeholder="Pinocde"
              onChange={(e) => {
                setPin(e.target.value);
              }}
            />
            <button
              disabled={pin.length < 6}
              onClick={(event) => longLat(event)}
              className={`h-8 w-20 rounded-3xl font-bold ${
                pin.length == 6
                  ? "bg-[#1d9bf0] text-white"
                  : "bg-[#196195] text-[#95999e]"
              }`}
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center text-xl m-3 cursor-pointer">
          {!darkMode ? (
            <BsMoon
              onClick={() => {
                setDarkMode(true);
              }}
            />
          ) : (
            <BsSunFill
              onClick={() => {
                setDarkMode(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
