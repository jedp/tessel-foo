// Ambient sensor on Port B

// Exports:
//   get(callback)   call back with err, {sound, light} levels

var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port.B);

var getAmbient = function(callback) {
  callback(new Error('Ambient module not ready'));
};

ambient.on('ready', function() {
  console.log('attx4 (ambient) ready');

  getAmbient = function(callback) {
    ambient.getSoundLevel(function(err1, sdata) {
      ambient.getLightLevel(function(err2, ldata) {
        callback(err1 || err2, {
          sound: sdata,
          light: ldata
        });
      });
    });
  };
});

ambient.on('error', function(err) {
  console.error('attx4:', err);
});

module.exports = {
  get: function(callback) {
    getAmbient(callback);
  }
};
