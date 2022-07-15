import mongoose, {Schema, model, models} from "mongoose";

const aqiSchema = new mongoose.Schema({

    CO_Value : Number, 
    Humidity : {
        Percent : Number
    },
    Temperature : {
        Celcius: Number,
        Fahrenheit: Number,
    }, 
    Heat_Index:  Number, 
    AirQuality: {
        PPM: Number
    }, 
    Latitude: Number, 
    Longitude: Number,
    LGP_Status: Number,
    Date: Date,
});

const Aqi = models.Aqi || model('Aqi', aqiSchema)

export default Aqi;