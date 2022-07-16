import { useState, useEffect } from "react";

function DataCard({ val, bound, what }) {
  const [col, setCol] = useState("");
  useEffect(() => {
    if (val < bound[1]) {
      setCol("#39FF14");
    } else if (bound[1] < val <= bound[2]) {
      setCol("#FFDB58");
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
    <div
      style={{ backgroundColor: col }}
      className="w-28 h-28 rounded-xl text-black font-bold font-mono m-4"
    >
      <div className="pl-2 pt-2">{what}</div>
      <div className="flex items-center font-bold justify-center pt-5">
        {val}
      </div>
    </div>
  );
}

export default DataCard;
