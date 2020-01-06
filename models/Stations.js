const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const stationSchema = new Schema({
    stationId: Number,
    sensorIds: Array,
    longtitude: Number,
    latitude: Number,
    stationName: String,
    stationDescription: String
});

mongoose.model('stations', stationSchema);