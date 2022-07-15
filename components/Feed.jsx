import { AqiContext } from "../context/aqiContext";
import { useContext, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import AqiBar from "./AqiBar";
var pincodeDirectory = require("india-pincode-lookup");

function Feed() {
  const { area, setArea, darkMode, pin, latestData, boundaries } =
    useContext(AqiContext);
  useEffect(() => {
    setArea({
      office: pincodeDirectory.lookup(pin)[0].officeName + ", ",
      district: pincodeDirectory.lookup(pin)[0].districtName + ", ",
      state: pincodeDirectory.lookup(pin)[0].stateName,
    });
  }, []);
  return (
    <div
      className={`${
        darkMode ? "bg-[#192734] text-white" : "bg-white"
      } h-full select-none`}
    >
      <div className="flex items-end pt-4">
        <MdLocationOn className="text-2xl ml-2 mr-1 md:text-3xl" />
        <div className="font-bold text-s md:text-xl">
          {area.office}
          {area.district}
          {area.state}
        </div>
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-center">
          <AqiBar
            wid={"15rem"}
            what={"AQI"}
            val={latestData.aqi}
            bound={boundaries.aqi}
          />
        </div>
        <div className="flex items-center justify-center space-x-5 mt-3">
          <AqiBar
            wid={"8rem"}
            what={"CO"}
            val={latestData.co}
            bound={boundaries.co}
          />
          <AqiBar
            wid={"8rem"}
            what={"PM 2.5-10"}
            val={latestData.pm2To10}
            bound={boundaries.pm2To10}
          />
        </div>
      </div>
    </div>
  );
}

export default Feed;
