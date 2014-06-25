// Snap fingers to get light level

// Ambient sensor on port B

var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port.B);

var SOUND_TRIGGER = 0.1;

ambient.on('ready', function() {
  console.log('attx4 ready');

  ambient.setSoundTrigger(SOUND_TRIGGER);
  ambient.on('sound-trigger', function(sdata) {

    ambient.getLightLevel(function(err, ldata) {
      console.log('ohai!', sdata, ldata);
    });
  });
});

