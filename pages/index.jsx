import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("");
  const getlocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };
  return <button onClick={getlocation}>Location</button>;
}
