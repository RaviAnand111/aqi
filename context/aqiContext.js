const pincode = require("pincode-lat-long");
import { createContext, useState, useEffect } from "react";

export const AqiContext = createContext();

export const AqiProvider = ({ children }) => {
  const [pin, setPin] = useState("110040");
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState({ long: "", lat: "" });
  const [area, setArea] = useState({ office: "", district: "", state: "" });
  const [latestData, setLatestData] = useState({
    aqi: 56,
    lpg: 1,
    co: 63,
    nh3: 0,
    no: 0,
    co2: 0,
    pm2To10: 25,
    humidity: 0,
    temp: 0,
    time: "",
  });
  const boundaries = {
    aqi: [0, 51, 101, 151, 201, 301, 500],
    co: [0, 51, 101, 151, 200, 300, 400],
    nh3: [0, 201, 401, 801, 1201, 1801, 2200],
    no: [0, 25, 50, 60, 150, 200, 700],
    co2: [0, 600, 1000, 1500, 2000, 2500],
    pm2To10: [0, 51, 101, 251, 351, 431, 500],
    temp: [0, 10, 20, 30, 40, 50],
  };

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
      setArea({ office: "Your location", district: " ", state: " " });
      setLatestData({
        aqi: 144,
        lpg: 1,
        co: 62,
        nh3: 201,
        no: 22,
        co2: 400,
        pm2To10: 98,
        humidity: 22,
        temp: 33,
        time: "Fri Jul 15 2022 15:43:03 GMT+0530 (India Standard Time)",
      });
    });
  };
  const longLat = (event) => {
    event.preventDefault();
    setLocation({
      lat: pincode.getlatlong(pin).lat,
      long: pincode.getlatlong(pin).long,
    });
    setLatestData({
      aqi: 144,
      lpg: 1,
      co: 62,
      nh3: 201,
      no: 22,
      co2: 400,
      pm2To10: 98,
      humidity: 22,
      temp: 33,
      time: "Fri Jul 15 2022 15:43:03 GMT+0530 (India Standard Time)",
    });
  };

  return (
    <AqiContext.Provider
      value={{
        pin,
        setPin,
        darkMode,
        setDarkMode,
        location,
        setLocation,
        getCurrentLocation,
        longLat,
        area,
        setArea,
        latestData,
        setLatestData,
        boundaries,
      }}
    >
      {children}
    </AqiContext.Provider>
  );
};
