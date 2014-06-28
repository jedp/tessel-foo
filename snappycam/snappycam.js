// You snap your fingers, we do the rest
//
// Usage: 
//   tessel run snappycam.js --upload-dir=<imagedir>
//
// Camera on port A
// Ambient sensor on port B

var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port.A);
var ambient = require('ambient-attx4').use(tessel.port.B);

// Threshold for sound trigger
var SOUND_TRIGGER = 0.1;

// Shine LED 3 while we're exposing a picture
var EXPOSING_LED = tessel.led[3];

// Define 'takePicture' when camera is ready
var takePicture = function() {};
camera.on('ready', function() {
  console.log('vc0706 ready');

  takePicture = function(callback) {
    EXPOSING_LED.high();
    camera.takePicture(function(err, image) {
      EXPOSING_LED.low();
      if (err) {
        callback(err);
        return;
      }
      callback(null, image);
    });
  };
});

camera.on('error', function(err) {
  console.error('camera:', err);
});

ambient.on('ready', function() {
  console.log('attx4 ready');
  console.log('Snap your fingers to take a picture');

  ambient.setSoundTrigger(SOUND_TRIGGER);

  ambient.on('sound-trigger', function(sdata) {
    console.log(sdata, 'Taking a picture ...');
    takePicture(function(err, image) {
      if (err) {
        console.error('camera: ', err);
        return;
      }
      var name = 'image-' + (Math.floor(Date.now()/1000)).toString() +
                 '.jpg';
      console.log('sending', name);
      process.sendfile(name, image);
    });
  });
});

ambient.on('error', function(err) {
  console.error('attx4: ', err);
});

