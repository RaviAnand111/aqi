import { AqiContext } from "../context/aqiContext";
import { useContext, useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa";
import AqiBar from "./AqiBar";
import DataCard from "./DataCard";
var pincodeDirectory = require("india-pincode-lookup");

function Feed() {
  const { area, setArea, darkMode, pin, latestData, boundaries } =
    useContext(AqiContext);
  const [col, setCol] = useState("");
  console.log(boundaries.temp[2]);
  useEffect(() => {
    if (latestData.temp < boundaries.temp[1]) {
      setCol("#0000FF");
    } else if (boundaries.temp[1] < latestData.temp <= boundaries.temp[2]) {
      setCol("#5DCEAF");
    } else if (boundaries.temp[2] < latestData.temp <= boundaries.temp[3]) {
      setCol("#FFDB58");
    } else if (boundaries.temp[3] < latestData.temp <= boundaries.temp[4]) {
      setCol("#DC582A");
    } else if (boundaries.temp[4] < latestData.temp <= boundaries.temp[5]) {
      setCol("#F73718");
    } else {
      setCol("blue");
    }
  }, [latestData.temp]);
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
      } select-none `}
    >
      <div className="flex items-end pt-4">
        <MdLocationOn className="text-2xl ml-2 mr-1 md:text-3xl" />
        <div className="font-bold text-s md:text-xl">
          {area.office}
          {area.district}
          {area.state}
        </div>
      </div>
      <div className="pl-4 flex items-center  ">
        <BiTimeFive className="text-xl" />
        <div className="pl-2 font-mono text-lg">3 hours ago</div>
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
      <div className="flex justify-center text-black">
        <div>
          <DataCard what={"NH3"} val={latestData.nh3} bound={boundaries.nh3} />
          <DataCard what={"NO"} val={latestData.no} bound={boundaries.no} />
          <DataCard what={"CO2"} val={latestData.co2} bound={boundaries.co2} />
        </div>
        <div className="mt-4 w-28 h-[23rem] ">
          <div
            style={{ backgroundColor: col }}
            className="h-[11rem] mb-[1rem] rounded-xl"
          >
            <div className="text-4xl pt-2 pl-2">
              <FaTemperatureLow />
            </div>
            <div className="flex justify-center text-xl font-bold pt-6">
              {latestData.temp}
              {"\u00b0"}C
            </div>
            <div className="flex justify-center text-s font-bold pt-7">
              Temperature
            </div>
          </div>
          <div className="h-[11rem] mt-[1rem] bg-blue-400 rounded-xl">
            <WiHumidity className="text-4xl" />
            <div className="flex justify-center pt-7 text-xl font-bold">
              {latestData.humidity}%
            </div>
            <div className="flex justify-center pt-[2.7rem] text-xl font-bold">
              Humidity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
