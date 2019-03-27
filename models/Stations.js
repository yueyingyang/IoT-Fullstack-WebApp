const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const stationSchema = new Schema({
    stationId: String,
});

mongoose.model('stations', stationSchema);