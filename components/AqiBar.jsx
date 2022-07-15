import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState, useEffect } from "react";

function AqiBar({ val, bound, wid, what }) {
  const [col, setCol] = useState("");
  useEffect(() => {
    if (val < bound[1]) {
      setCol("#39FF14");
    } else if (bound[1] < val <= bound[2]) {
      setCol("#FFFF00");
    } else if (bound[2] < val <= bound[3]) {
      setCol("#FF5F1F");
    } else if (bound[3] < val <= bound[4]) {
      setCol("#FF3131");
    } else if (bound[4] < val <= bound[5]) {
      setCol("#9D00FF");
    } else {
      setCol("#3D251E");
    }
  }, [val]);
  return (
    <div style={{ width: wid }}>
      <CircularProgressbar
        value={val}
        maxValue={bound[6]}
        text={what + ": " + val}
        styles={buildStyles({
          pathColor: `${col}`,
          textColor: "#f88",
          pathTransitionDuration: 1.5,
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
        strokeWidth={3}
      />
    </div>
  );
}

export default AqiBar;
