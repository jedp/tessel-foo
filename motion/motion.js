// Receive motion detector data on GPIO A6 (pin 4)

var tessel = require('tessel');
var motion = tessel.port.GPIO.pin.A6;

// It works!
console.log('pin A6:', motion.read());

// XXX registering an .on() event listener fails
// Opened tessel forum topic:
// https://forums.tessel.io/t/gpio-events-cannot-call-method-on/302
motion.on('change', function(time, type) {
  console.log('motion:', time, type, motion.read());
});

