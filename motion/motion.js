// Receive motion detector data on GPIO A6 (pin 4)

var tessel = require('tessel');
var motion = tessel.port.GPIO.pin.G6;

// It works!
console.log('pin G6:', motion.read());

motion.on('change', function(time, type) {
  console.log('motion:', time, type, motion.read());
});

