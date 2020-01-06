// 引入model的方式不是require，而是mongoose.model
const mongoose = require('mongoose');
const Station = mongoose.model("stations");
const RawData = mongoose.model("rawData");
const Stat = mongoose.model("statistics");

const randomArray = (length, med, range) => {
    const arr = [];
    for(let i = 0; i < length; i++){
        arr.push((med - range) + Math.floor(2 * range * Math.random()))
    }
   return arr;
}

module.exports = app => {
    app.post('/login', async (req, res) => {
        const user = req.body;
        
        var userId = user["userId"];
        var password = user.password;
        if(userId == "1" && password == "1"){
            res.send({role: "admin"});
        } else if (userId == "2" && password == "2"){
            res.send({
                role: "user"
            });
        }else{
            res.send("Error");
        }
        res.send("Error");
        // res.send({role:"admin"});
    });
 app.post('/station/delete', async (req, res) => {
     const deleteId = req.body.deleteId;
     const stationsList = await Station.deleteOne({
         stationId: parseInt(deleteId)
     }, function (err) {
         if (err) {
             res.send(err);
         }
     });
     res.send({
         status: "success",
         deleteId
     })
 });
 app.post('/station/add', async (req, res) => {

    //  const {
    //      stationId,
    //      stationName, longtitude,
    //   latitude} = req.body;
      const deleteResult = await Station.deleteOne({
          stationId: req.body.stationId
      }, function (err) {
          if (err) {
              res.send(err);
          }
      });
     const stationsList = await Station.insertMany({
                 stationId: req.body.stationId,
                 stationName: req.body.stationName,
                 stationDescription: "",
                 longtitude: req.body.longtitude,
                 latitude: req.body.latitude
             }, function (err) {
         if (err) {
             res.send(err);
         }
     });
     res.send({
         status: "success"
     })
 });
 app.post('/station/update', async (req, res) => {
     const deleteId = req.body.stationId;
    const deleteResult = await Station.deleteOne({
        stationId: req.body.stationId
    }, function (err) {
        if (err) {
            res.send(err);
        }
    });
     const stationsList = await Station.insertMany({
         stationId: req.body.stationId,
         sensorIds: [9, 10],
         stationName: req.body.stationName,
         stationDescription: "",
         longtitude: req.body.longtitude,
         latitude: req.body.latitude
     }, function (err) {
         if (err) {
             res.send(err);
         }
     });
     res.send({
         status: "success"
     })

 });
    app.get('/station/list', async (req, res) => {
        const stationsList = await Station.find();
        res.send(stationsList)
    });

    app.get("/station/add",async (req, res) => {

        Station.insertMany([{
            stationId: 1,
            sensorIds: [1, 2, 3],
            stationName:"站点1",
            stationDescription:"",
            longtitude: 90,
            latitude: 38
        },{
            stationId: 2,
            sensorIds: [4],
            stationName: "站点2",
            stationDescription: "",
            longtitude: 103,
            latitude: 37
        },{
            stationId: 3,
            sensorIds: [7, 8],
            stationName: "站点3",
            stationDescription: "",
            longtitude: 116,
            latitude: 39
        }]);
        res.send("插入成功！")

    })


    app.get('/station/addnew', async (req, res) => {
        
        const a = await RawData.insertMany([{
            stationId: 1,
            sensorId: 1,
            type: "light",
            d: new Date("2019-03-28T00:00:00Z") ,
            p: randomArray(60, 300, 30)
        }, {
            stationId: 1,
            sensorId: 2,
            type: "light",
            d: new Date("2019-03-28T00:00:00Z"),
            p: randomArray(60, 250, 20)
        }, {
            stationId: 1,
            sensorId: 3,
            type: "light",
            d: new Date("2019-03-28T00:00:00Z"),
            p: randomArray(60, 200, 10)
        }])

        res.send(a)
    });

    app.get("/station/stat", async (req, res) => {
      const stationsList = await Stat.insertMany([{
          stationId: 1,
          tem_hourly: randomArray(24, 20, 5),
          tem_daily: randomArray(31, 18, 3),
          hum_hourly: randomArray(24, 60, 10),
          hum_daily: randomArray(31, 60, 10),
          co2_hourly: randomArray(24, 30, 5),
          co2_daily: randomArray(31, 30, 2),
          light_hourly: randomArray(24, 220, 30),
          light_daily: randomArray(31, 100, 30)
      }, {
          stationId: 2,
          tem_hourly: randomArray(24, 21, 5),
          tem_daily: randomArray(31, 20, 3),
          hum_hourly: randomArray(24, 50, 10),
          hum_daily: randomArray(31, 50, 10),
          co2_hourly: randomArray(24, 28, 5),
          co2_daily: randomArray(31, 25, 2),
          light_hourly: randomArray(24, 300, 30),
          light_daily: randomArray(31, 200, 30)
      },{
          stationId: 3,
          tem_hourly: randomArray(24, 25, 5),
          tem_daily: randomArray(31, 26, 3),
          hum_hourly: randomArray(24, 40, 10),
          hum_daily: randomArray(31, 50, 10),
          co2_hourly: randomArray(24, 28, 5),
          co2_daily: randomArray(31, 25, 2),
          light_hourly: randomArray(24, 300, 30),
          light_daily: randomArray(31, 200, 30)
      }])
      res.send(stationsList);
    });


   
};
