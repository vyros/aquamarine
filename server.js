// environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// configurations
var config      = require('./config/env/development');
var mongoose    = require('./config/mongoose');
var express     = require('./config/express');
var passport    = require('./config/passport');

var app         = express();

// dependencies
var fs          = require('fs');
var http        = require('http');
var https       = require('https');

var sslCertOptions  = {
    key: fs.readFileSync('./config/sslcert/server-2021.key'),
    cert: fs.readFileSync('./config/sslcert/server-2021.crt')
};

var server      = http.createServer(app);
var sslServer   = https.createServer(sslCertOptions, app);

// starting servers
server.listen(config.port, function() {
  console.log("Server listening on port " + config.port);
});

sslServer.listen(config.sslPort, function() {
  console.log("SslServer listening on port " + config.sslPort);
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof httpPort === 'string'
    ? 'Pipe ' + httpPort
    : 'Port ' + httpPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.httpPort;
  //debug('Listening on ' + bind);
}

server.on('error', onError);
server.on('listening', onListening);
