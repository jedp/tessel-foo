// Serve json data providing current ambient and climate conditions

var http = require('http');

var ambient = require('./ambient');
var climate = require('./climate');

console.log('Starting HTTP server ...');

// Routes

function returnData(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  ambient.get(function(err1, ambient) {
    climate.get(function(err2, climate) {
      res.end(JSON.stringify({
        errors: (err1 && err2) ? [err1, err2] : [err1 || err2], 
        ambient: ambient,
        climate: climate
      }));
    });
  });
}

function returnHome(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('There will be something here');
}

// Server

http.createServer(function(req, res) {
  console.log('Handling', req.url);

  switch (req.url) {
    case "/data":
      returnData(req, res);
      break;
    case "/":
      returnHome(req, res);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end(req.url + ' leads nowhere');
      break;
  }
}).listen(80);
