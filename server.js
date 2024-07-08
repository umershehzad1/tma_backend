'use strict'
 
 require('dotenv').config();
 let config     = {}; 
     config.app = require('./config/app');
     config.database = require('./config/database');

/*
 |--------------------------------------------------------------------------
 | Node_framwork - A Node Framework For Website & apis
 |--------------------------------------------------------------------------
 |
 | This file allows us to Starts server & gave functionality from the
 | built-in Node web server. 
 |
 */

 let express = require('express');
 let autoload = require('./bootstrap/autoload');

 let app = express();
 app.use('/', autoload);

 let http = require('http').Server(app);
 global.io = require('socket.io')(http, {path: '/socket.io',});
 require('./routes/socket');
/**
 * On Database Connection.
 */


http.listen(config.app.port, () => {
  console.log('Server Running on port '+config.app.port);
  }); 
  app.on('error', onError);
  app.on('listening', onListening);

 
 /**
 * Event listener for HTTP server "error" event.
 */

 function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

 let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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

 /**
 * Event listener for HTTP server "listening" event.
 */

 function onListening() {
 let addr = server.address();
 let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
 }