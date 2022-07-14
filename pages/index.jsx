import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [location, setLocation] = useState({ lat: "", long: "" });
  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  };
  return (
    <>
      <Navbar />
    </>
  );
}
