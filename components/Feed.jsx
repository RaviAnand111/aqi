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
  const {
    area,
    setArea,
    pin,
    latestData,
    boundaries,
    fetchingLatestData,
    location,
  } = useContext(AqiContext);
  const [col, setCol] = useState("");
  useEffect(() => {
    if (latestData.temp < boundaries.temp[1]) {
      setCol("#0000FF");
    } else if (
      boundaries.temp[1] < latestData.temp &&
      latestData.temp <= boundaries.temp[2]
    ) {
      setCol("#5DCEAF");
    } else if (
      boundaries.temp[2] < latestData.temp &&
      latestData.temp <= boundaries.temp[3]
    ) {
      setCol("#FFDB58");
    } else if (
      boundaries.temp[3] < latestData.temp &&
      latestData.temp <= boundaries.temp[4]
    ) {
      setCol("#DC582A");
    } else if (
      boundaries.temp[4] < latestData.temp &&
      latestData.temp <= boundaries.temp[5]
    ) {
      setCol("#F73718");
    } else {
      setCol("red");
    }
  }, [latestData]);
  useEffect(() => {
    setArea({
      office: pincodeDirectory.lookup(pin)[0].officeName + ", ",
      district: pincodeDirectory.lookup(pin)[0].districtName + ", ",
      state: pincodeDirectory.lookup(pin)[0].stateName,
    });
    fetchingLatestData(location);
  }, []);

  return (
    <div>
      <div className="flex items-end pt-4">
        <MdLocationOn className="text-2xl ml-2 mr-1 md:ml-6 md:mt-4 md:mr-3 md:text-3xl lg:mt-1" />
        <div className="font-bold text-s md:text-xl">
          {area.office}
          {area.district}
          {area.state}
        </div>
      </div>
      <div className="pl-4 flex items-center md:pl-8 ">
        <BiTimeFive className="text-xl" />
        <div className="pl-2 md:pl-3 md:mt-2 font-mono text-lg">
          {latestData.duration}
        </div>
      </div>
      <div className="lg:flex lg:items-center lg:justify-center lg:space-x-8 xl:space-x-14">
        <div className="pt-4 md:pt-6  md:flex justify-center md:items-center xl:space-x-6 ">
          <div className="flex items-center justify-center">
            <AqiBar
              wid={"18rem"}
              what={"AQI"}
              val={latestData.aqi}
              bound={boundaries.aqi}
            />
          </div>
          <div className="flex md:flex-col items-center justify-center space-x-1 mt-3 md:space-y-3">
            <AqiBar
              wid={"9rem"}
              what={"CO"}
              val={latestData.co}
              bound={boundaries.co}
            />
            <AqiBar
              wid={"9rem"}
              what={"PM 2.5-10"}
              val={latestData.pm2To10}
              bound={boundaries.pm2To10}
            />
          </div>
        </div>
        <div className="flex justify-center space-x-3 md:space-x-12 lg:space-x-8 xl:space-x-12 text-black">
          <div>
            <DataCard
              what={"NH3"}
              val={latestData.nh3}
              bound={boundaries.nh3}
            />
            <DataCard what={"NO"} val={latestData.no} bound={boundaries.no} />
            <DataCard
              what={"CO2"}
              val={latestData.co2}
              bound={boundaries.co2}
            />
          </div>
          <div className="mt-4 md:mt-6 w-[8rem] md:w-44 lg:w-32 xl:w-44 h-[23rem] md:h-[27rem] lg:h-[25.5rem] lg:mt-4">
            <div
              style={{ backgroundColor: col }}
              className="h-[11rem] md:h-[12.5rem] lg:h-[12rem] mb-[1rem] md:mb-[2rem] lg:mb-[1.5rem] rounded-xl"
            >
              <div className="text-4xl pt-2 pl-2 md:pt-3 md:pl-3">
                <FaTemperatureLow />
              </div>
              <div className="flex justify-center text-xl font-bold pt-6 md:pt-8 md:text-3xl">
                {latestData.temp}
                {"\u00b0"}C
              </div>
              <div className="flex justify-center text-s font-bold pt-7 md:text-xl md:pt-8">
                Temperature
              </div>
            </div>
            <div className="h-[11rem] md:h-[12.5rem] lg:h-[12rem] mt-[1rem] md:mt-[2rem] lg:mt-[1.5rem] bg-blue-400 rounded-xl">
              <WiHumidity className="text-5xl md:pt-3 md:pl-3" />
              <div className="flex justify-center pt-7 text-xl md:text-3xl font-bold">
                {latestData.humidity}%
              </div>
              <div className="flex justify-center pt-[2.7rem] text-xl font-bold">
                Humidity
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
