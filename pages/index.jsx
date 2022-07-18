import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { AqiContext } from "../context/aqiContext";
import { useContext } from "react";

export default function Home() {
  const { darkMode } = useContext(AqiContext);
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
          </div>
        </div>
      </div>
    </>
  );
}
