import { useState, useEffect } from "react";

function DataCard({ val, bound, what }) {
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
    <div
      style={{ backgroundColor: col }}
      className="w-[8rem] md:w-44 lg:w-32 xl:w-36 h-28 md:h-32 lg:h-[7.5rem] rounded-xl md:rounded-t-2xl md:text-2xl text-black font-bold font-mono mt-4 mb-4 md:mt-6 md:mb-6 lg:mt-4"
    >
      <div className="pl-2 pt-2 md:pl-3 md:pt-3">{what}</div>
      <div className="flex items-center font-bold justify-center pt-5 md:pt-4 lg:pt-3">
        {val}
      </div>
    </div>
  );
}

export default DataCard;
