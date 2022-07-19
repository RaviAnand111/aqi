import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";

function AqiBar({ val, bound, wid, what }) {
  const [col, setCol] = useState("");
  useEffect(
    (bound) => {
      if (val < bound[1]) {
        setCol("#39FF14");
      } else if (bound[1] < val && val <= bound[2]) {
        setCol("#FFDB58");
      } else if (bound[2] < val && val <= bound[3]) {
        setCol("#FF5F1F");
      } else if (bound[3] < val && val <= bound[4]) {
        setCol("#FF3131");
      } else if (bound[4] < val && val <= bound[5]) {
        setCol("#9D00FF");
      } else {
        setCol("#3D251E");
      }
    },
    [val]
  );
  return (
    <div style={{ width: wid }}>
      <CircularProgressbar
        value={val}
        maxValue={bound[6]}
        text={val}
        styles={buildStyles({
          pathColor: `${col}`,
          textColor: col,
          trailColor: "#a3a2a2",
          pathTransitionDuration: 1.5,
          backgroundColor: "",
          textSize: "1.5rem",
        })}
        strokeWidth={7}
      />
      <div className="flex justify-center text-2xl">{what}</div>
    </div>
  );
}

export default AqiBar;
