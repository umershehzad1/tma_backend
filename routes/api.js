'use strict'

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

const express = require('express');
                require('express-group-routes');
const multer  = require('multer');
const upload  = multer({ storage: multer.memoryStorage({}), limits: { fileSize: 5000000 }});
     
/** Controllers **/
const userCtrl = require('../app/Http/Controllers/v1/UserController');
const authCtrl = require('../app/Http/Controllers/v1/AuthController');
const uploadCtrl = require('../app/Http/Controllers/v1/UploadController');
const ProductCtrl = require('../app/Http/Controllers/v1/ProductController');
const CategoryCtrl = require('../app/Http/Controllers/v1/CategoryController');
/** Validation **/
const userReq = require('../app/Http/Requests/UserValidator');

const app = express.Router();

app.group("/user", (Route) => {

    Route.get("/", authCtrl.authenticate, userCtrl.me);
    Route.get("/verify-token", authCtrl.authenticate, userCtrl.verifyToken);
    Route.post("/signup", userReq.signup, userReq.validate, userCtrl.signup);
    Route.post("/login", userReq.signin, userReq.validate, userCtrl.login);
    Route.put("/", authCtrl.authenticate, userReq.edit, userReq.validate, userCtrl.edit);
    Route.post("/forget-password", userReq.forgetPassword, userReq.validate, userCtrl.forgetPassword);
    Route.post("/reset-password", userReq.resetPassword, userReq.validate, userCtrl.resetPassword);
});

app.group("/upload", (Route) => {

    Route.post("/", upload.single('attachment'), uploadCtrl.upload);
});

app.group("/product", (Route) => {
    
    Route.get("/", ProductCtrl.getAll);
    Route.get("/:id", ProductCtrl.detail);
    Route.post("/", ProductCtrl.create);
    Route.put("/:id", ProductCtrl.update);
    Route.delete("/:id", ProductCtrl.delete);
});

app.group("/category", (Route) => {
    
    Route.get("/", CategoryCtrl.getAll);
    Route.post("/", CategoryCtrl.create);
    Route.put("/:id", CategoryCtrl.update);
    Route.delete("/:id", CategoryCtrl.delete);
});

module.exports = app;