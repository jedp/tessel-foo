// Stream X,Y,Z data from accelerometer

// Accelerometer on port D

var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port.D);

// Pad numbers to six chars, so minus signs don't get wobbly
function pad(s) {
  var length = 6;
  var slen = s.length;
  if (slen >= length) {
    return s;
  }
  return "     ".slice(0, length-slen) + s;
}

accel.on('ready', function() {
  console.log('mma84 ready');

  accel.on('data', function(data) {
    console.log(
      pad(data[0].toFixed(2)), // X
      pad(data[1].toFixed(2)), // Y
      pad(data[2].toFixed(2))  // Z
    );
  });
});

accel.on('error', function(err) {
  console.error('Oh noes:', err);
});
