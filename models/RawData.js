const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const rawDataSchema = new Schema({
    stationId: Number,
    sensorId: Number,
    type: String,
    d: Date,
    p: Object
});

mongoose.model('rawData', rawDataSchema);

