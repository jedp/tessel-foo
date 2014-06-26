// Climate module on port A

// Exports:
//   get(callback)   call back with err, {temperature, humidity}

var tessel = require('tessel');
var climate = require('climate-si7005').use(tessel.port.A);

var getClimate = function(callback) {
  callback(new Error("Climate module not ready"));
};

climate.on('ready', function() {
  console.log('si7005 (climate) ready');

  getClimate = function(callback) { 
    climate.readTemperature('f', function (err1, temperature) {
      climate.readHumidity(function (err2, humidity) {
        callback(err1 || err2, {
          temperature: temperature,
          humidity: humidity
        });
      });
    });
  };
});

climate.on('error', function(err) {
  console.error('si7005:', err);
});

module.exports = {
  get: function(callback) {
    getClimate(callback);
  }
};

