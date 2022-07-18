import connectMongo from "../../utils/connectDB";
import AqiModel from "../../models/aqiModel";

export default async function (req, res) {
  if (req.method === "GET") {
    await connectMongo();

    const last10daysdata = await AqiModel.find({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    })
      .sort({ time: 1 })
      .limit(10);

    res.json(last10daysdata);
  }
}
