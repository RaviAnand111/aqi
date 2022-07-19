import mongoose, { Schema, model, models } from "mongoose";

const aqiSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  aqi: Number,
  lpg: Number,
  co: Number,
  nh3: Number,
  no: Number,
  co2: Number,
  pm2To10: Number,
  humidity: Number,
  temp: Number,
  time: Date,
});

const Aqi = models.Aqi || model("Aqi", aqiSchema);

export default Aqi;
