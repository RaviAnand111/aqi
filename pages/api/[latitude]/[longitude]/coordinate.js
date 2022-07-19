// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "../../../../utils/connectDB";
import Aqi from "../../../../models/aqiModel";
import { format } from "timeago.js";

export default async function handler(req, res) {
  await connectMongo();
  console.log("connected to mongo successfully");

  try {
    if (req.method === "GET") {
      const alldata = await Aqi.find({
        latitude: req.query.latitude,
        longitude: req.query.longitude,
      })
        .sort({ time: 1 })
        .limit(1);
      const timeago = format(alldata[0].time);
      res.json({ data: alldata[0], duration: timeago });
    }
  } catch (error) {
    res.send({ message: "No Data for this Location" });
  }
}
