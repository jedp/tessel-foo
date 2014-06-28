var http = require('http');

http.createServer(function(req, res) {
  console.log('got a request');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({message: 'Hello, world'}));
}).listen(80);

console.log('Server running');
