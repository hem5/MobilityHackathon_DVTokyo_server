var express = require('express');
var mqtt = require('mqtt');
var mqttclient = require('../mqttclient');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Team Tokyo mobility hackathon' });
});

router.get('/search', function(req, res, next) {
  var userId = req.query.user_id;
  var lat = req.query.lat;
  var lon = req.query.lon;

  // fetch data from database.
  // ...

  res.json({
    success:1,
    data:[
      {
        id:'a0001',
        name:'car this is available',
        status:'AVAILABLE',
        lat:33.9008580,
        lon:-118.3922120
      }, // BCG Digital Ventures, 1240 Rosecrans Ave, Manhattan Beach, CA 90266
      {
        id:'a0002',
        name:'dummy car 1',
        status:'AVAILABLE',
        lat:33.9067803,
        lon:-118.3906138
      }, // Whole Foods Market, 760 S Sepulveda Blvd, El Segundo, CA 90245
      {
        id:'a0003',
        name:'dummy car 2',
        status:'AVAILABLE',
        lat:33.9034552,
        lon:-118.3890162
      }  // ArcLight Cinemas - Beach Cities, 831 S Nash St, El Segundo, CA 90245
    ]
  });
});

router.get('/detail', function(req, res, next) {
  var userId = req.query.user_id;
  var carId = req.query.car_id;

  res.json({
    success:1,
    data:{
      id:'a0001',
      name:'car this is available',
      status:'AVAILABLE',
      lat:33.9008580,
      lon:-118.3922120,
      remaining:0.37,
    }
  });
});

router.post('/reserve', function(req, res, next) {
  var userId = req.query.user_id;
  var carId = req.query.car_id;

  res.json({
    success:1,
    data:{

    }
  });

  mqttclient.sendMsgToCar('1234', {
    request: "start",
    usrId: "xxxxxxxxx",
    expectedConsumption: "100"
  });
});

router.post('/finish', function(req, res, next) {
  var userId = req.query.user_id;
  var carId = req.query.car_id;

  res.json({
    success:1,
    data:{

    }
  });

  mqttclient.sendMsgToCar('1234', {
    request: "stop",
    usrId: "xxxxxxxxx",
    expectedConsumption: "100"
  });
});

module.exports = router;
