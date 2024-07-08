'use strict'

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register Web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "web" middleware group. Enjoy building your Web!
|
*/

let express = require('express');
              require('express-group-routes');
     
/** Controllers **/
let userCtrl = require('../app/Http/Controllers/v1/UserController');
let socketCtrl = require('../app/Http/Controllers/v1/SocketController');

/** Validation **/
let userReq = require('../app/Http/Requests/UserValidator');

let	app = express.Router();

app.group("/", (Route) => {

});

module.exports = app;