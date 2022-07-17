import { BiCurrentLocation } from "react-icons/bi";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { FaSearchLocation } from "react-icons/fa";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AqiContext } from "../context/aqiContext";
var pincodeDirectory = require("india-pincode-lookup");

function Navbar() {
  const router = useRouter();
  const {
    getCurrentLocation,
    darkMode,
    setDarkMode,
    longLat,
    pin,
    setPin,
    setArea,
  } = useContext(AqiContext);

  return (
    <>
      <div
        className={`flex justify-between sticky top-0 z-10 h-14 w-full backdrop-filter backdrop-blur-md`}
      >
        <div
          className="text-3xl md:text-4xl items-center flex font-bold cursor-pointer ml-8"
          onClick={() => {
            router.push("/");
          }}
        >
          aqi
        </div>
        <div className="flex">
          <div className="flex ml-2 items-center ">
            <BiCurrentLocation
              className="cursor-pointer md:text-xl  text-[#1d9bf0]"
              onClick={getCurrentLocation}
            />
          </div>
          <div className="flex mr-0">
            <form action="" className="flex items-center">
              <FaSearchLocation className="ml-2 pl-1 md:ml-4 md:pl-0 " />
              <input
                value={pin}
                type="number"
                className="w-[4.5rem] md:w-20 h-full outline-none bg-transparent text-lg text-center"
                placeholder="Pincode"
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
              <button
                disabled={pin.length < 6}
                onClick={async (event) => {
                  await longLat(event);
                  await setArea({
                    office: pincodeDirectory.lookup(pin)[0].officeName + ", ",
                    district:
                      pincodeDirectory.lookup(pin)[0].districtName + ", ",
                    state: pincodeDirectory.lookup(pin)[0].stateName,
                  });
                }}
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
    </>
  );
}

export default Navbar;
