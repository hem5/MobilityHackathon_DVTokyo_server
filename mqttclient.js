var mqtt = require('mqtt');

var MQTTClient = function() {
};

MQTTClient.prototype.connect = function() {
  var carMsgReceiver  = mqtt.connect('mqtt://test.mosquitto.org:1883');
  var topicCar2Server = '/dvhack18/base/notifyCarStatus/';
  var self = this;
  carMsgReceiver.on('connect', function () {
    carMsgReceiver.subscribe(topicCar2Server);
  });

  carMsgReceiver.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    var data = JSON.parse(message);
    var status = data.status;
    if (this.carStatusHandlers) {
      var f = this.carStatusHandlers[status];
      if (f) {
        f(data);
      } else {
        // TODO: unexpected status
      }
    }
  });
}

MQTTClient.prototype.sendMsgToCar = function(carId, data) {
  var topicServer2Car = '/dvhack18/base/requestCarStatus/'+carId;
  var client  = mqtt.connect('mqtt://test.mosquitto.org:1883');

  client.on('connect', function () {
    client.subscribe(topicServer2Car);
    client.publish(topicServer2Car, JSON.stringify(data));
    client.end();
  });

};

MQTTClient.prototype.setCarStatusHandler = function(handler) {
  this.carStatusHandlers = handler;
};

var mqttclient = new MQTTClient();
var carMsgHandler = require('./routes/carmsghandler');
var handler = carMsgHandler();
mqttclient.setCarStatusHandler(handler);

module.exports = mqttclient;