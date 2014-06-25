// Log the current temperature and humidity when the
// 'Config' button is pressed
//
// Climate module on port A

var tessel = require('tessel');
var climatelib = require('climate-si7005');

var climate = climatelib.use(tessel.port.A);

function getClimate(callback) {
  climate.readTemperature('c', function (err1, temp) {
    climate.readHumidity(function (err2, humid) {
      callback(err1 || err2, {
        temp: temp,
        humid: humid
      });
    });
  });
}

climate.on('ready', function () {
  console.log('Connected to si7005');
  console.log('Press Config button for temp and humidity');

  tessel.button.on('press', function() {
    getClimate(function(err, data) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data.temp.toFixed(1) + ' C,  ' +
                  data.humid.toFixed(3) + ' %H');
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});
