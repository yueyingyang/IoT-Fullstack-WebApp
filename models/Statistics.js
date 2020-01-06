const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const statisticsSchema = new Schema({
    stationId: Number,
    tem_hourly: Array,
    tem_daily: Array,
    hum_hourly: Array,
    hum_daily: Array,
    co2_hourly: Array,
    co2_daily: Array,
    light_hourly: Array,
    light_daily: Array
});

mongoose.model('statistics', statisticsSchema);
