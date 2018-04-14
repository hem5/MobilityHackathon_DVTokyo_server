var handler = function() {

};
handler.standby = function(data) {
  console.log('server received standby message from car.');

};
handler.inUse = function(data) {
  console.log('server received inUse message from car.');
};

module.exports = handler;