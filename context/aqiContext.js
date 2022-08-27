const pincode = require("pincode-lat-long");
import { createContext, useState } from "react";
import dateFormat, { masks } from "dateformat";

export const AqiContext = createContext();

export const AqiProvider = ({ children }) => {
  const [pin, setPin] = useState("110040");
  const [darkMode, setDarkMode] = useState(true);
  const [location, setLocation] = useState({
    long: "77.089878",
    lat: "28.834898",
  });
  const [area, setArea] = useState({ office: "", district: "", state: "" });
  const [aqi, setAqi] = useState([]);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  const [latestData, setLatestData] = useState({
    aqi: 0,
    lpg: 0,
    co: 0,
    nh3: 0,
    no: 0,
    co2: 0,
    pm2To10: 0,
    humidity: 0,
    temp: 0,
    time: "",
    duration: "",
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
    });
    console.log(location);
  };

  const longLat = (event) => {
    event.preventDefault();
    setLocation({
      lat: pincode.getlatlong(pin).lat,
      long: pincode.getlatlong(pin).long,
    });
  };

  const fetchingLatestData = async (location) => {
    await fetch(`/api/${location.lat}/${location.long}/coordinate`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setLatestData(data.data);
        setLatestData((prevState) => ({
          ...prevState,
          duration: data.duration,
        }));
      });
    await fetch(`/api/${location.lat}/${location.long}/data`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (datas) => {
        datas.map((data, index) => {
          aqi[index] = data.aqi;
          temp[index] = data.temp;
          time[index] = dateFormat(data.time, "dd");
        });
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
        fetchingLatestData,
        aqi,
        temp,
        time,
        setAqi,
        setTime,
        setTemp,
      }}
    >
      {children}
    </AqiContext.Provider>
  );
};
