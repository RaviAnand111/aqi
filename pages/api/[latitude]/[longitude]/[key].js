import connectMongo from "../../../../utils/connectDB";
import AqiModel from "../../../../models/aqiModel";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      await connectMongo();

      // const last10daysdata = await AqiModel.find({
      // })
      //   .sort({ time: 1 })
      //   .limit(10);

      // const values = [];

      // last10daysdata.map(data => values.push(data[req.query.key]));

      const lastvalue = await AqiModel.find({

        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }).find({
      date: {
          $gte: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000),
        },
      }).sort({ time: -1 });

      res.send(lastvalue);
    }
  } catch (err) {
    res.send("Error on the server");
  }
}
