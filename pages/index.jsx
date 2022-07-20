import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Graph from "../components/Graph";
import { AqiContext } from "../context/aqiContext";
import { useContext, useEffect } from "react";

export default function Home() {
  const { darkMode, location, fetchingLatestData, aqi, temp, time } =
    useContext(AqiContext);
  useEffect(() => {
    fetchingLatestData(location);
  }, [location]);

  return (
    <>
      <div
        className={`${
          darkMode ? "bg-[#15202b] text-white" : ""
        } select-none flex items-center justify-center `}
      >
        <div className="xl:max-w-[1400px]  ">
          <div>
            <Navbar />
            <Feed />
            <Graph time={time} temp={temp} aqi={aqi} />
          </div>
        </div>
      </div>
    </>
  );
}
