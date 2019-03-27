// 引入model的方式不是require，而是mongoose.model
const mongoose = require('mongoose');
const Station = mongoose.model("stations");

module.exports = app => {
   

    app.get('/station/list', async (req, res) => {
        const stationsList = await new Station({
            stationId: "123"
        }).save();
        res.send("插入成功！")
    });

};
