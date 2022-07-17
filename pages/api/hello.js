// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "../../utils/connectDB";
import Aqi from "../../models/aqiModel";
import { format} from 'timeago.js';

export default async function handler(req, res) {

  await connectMongo();
  console.log("connected to mongo successfully");
  
  if(req.method === 'GET'){

      const alldata = await Aqi.find({latitude: req.body.latitude, longitude: req.body.longitude}).sort({time:1}).limit(1);
      const timeago = format(alldata[0].time);

      res.json({time: timeago});
  }

}
