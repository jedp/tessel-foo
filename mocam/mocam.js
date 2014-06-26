// Trigger the camera with a PIR sensor

// Receive motion detector data on GPIO A6 (pin 4)
// Camera on port A

var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port.A);
var motion = tessel.port.GPIO.pin.G6;

// Shine LED 3 while we're exposing a picture
var EXPOSING_LED = tessel.led[3];
var makingExposure = false;

// Define 'takePicture' when camera is ready
var takePicture = function() {};
camera.on('ready', function() {
  console.log('vc0706 ready');

  takePicture = function() {
    if (makingExposure) {
      return;
    }

    EXPOSING_LED.high();
    makingExposure = true;

    camera.takePicture(function(err, image) {
      EXPOSING_LED.low();
      makingExposure = false;

      if (err) {
        callback(err);
        return;
      }

      var name = 'image-' + (Math.floor(Date.now()/1000)).toString() + '.jpg';
      console.log('sending', name);
      process.sendfile(name, image);
    });
  };
});

camera.on('error', function(err) {
  console.error('camera:', err);
});

motion.on('rise', function(time, type) {
  console.log('Something moved; I will photograph it.');
  // Could make this take a photo at a regular interval,
  // as long as the sensor sees something.
  setTimeout(takePicture, 1000);
});

motion.on('fall', function() {
  console.log('The thing went away.');
});

