// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "../../utils/connectDB";
import Aqi from "../../models/aqiModel";

export default async function handler(req, res) {

  const vari = req.body;

  console.log("connecting to mongo");
  await connectMongo();
  console.log("connected to mongo successfully");

  console.log("Creating document");
  const aqi = await Aqi.create(req.body);
  console.log("Document Created")   

  res.json({aqi})
}
