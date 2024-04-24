'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ejs = require("ejs");
const path = require("path");

let config     = {}; 
config.app = require('../../../../config/app');
config.services = require('../../../../config/services');
const { JWT_EXPIRES_IN } = require('../../../../config/constants');

const json = require('../../../Traits/ApiResponser');
const email = require('../../../Traits/SendEmail');

    /*
    |--------------------------------------------------------------------------
    | User Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles signup users and login for the application using
    | facebook & google Oauth2. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

const createToken = (user) => {

    return jwt.sign({

        _id: user._id,
        name: user.name,
        email: user.email
    }, config.app.key, {expiresIn: JWT_EXPIRES_IN});
}

let o = {}

o.signup = async (req, res, next) => {

    try{
        const user = await User.findOne({email: req.body.email});

        if(user){

            return json.errorResponse(res, 'User Already Exist!', 409)
        }

        /*if(!user.roles.includes("admin")){

            return json.errorResponse(res, "only admins are authorized to perform this task", 401)
        }*/

        let password = bcrypt.hashSync(req.body.password, 5);
        
        let newUser = new User({

            name: req.body.name,
            email: req.body.email,
            password: password
        })

        newUser = await newUser.save()

        let newUserInfo = newUser._doc;

        // Remove sensitive information
        delete newUserInfo.password;

        newUserInfo.token = createToken(newUser)
        json.showOne(res, newUserInfo, 201)

    }catch(err){

        return json.errorResponse(res, err)
    }
    

}

o.login = async (req, res, next) => {

    try{
        const user = await User.findOne({ email: req.body.email }).select('_id name email password roles phone billingInfo shippingInfo')
        
        if(!user){

            return json.errorResponse(res, "User Not found", 404)
        }

        const validUser = bcrypt.compareSync(req.body.password, user.password); 


        if(!validUser){

            return json.errorResponse(res, "Wrong password", 401)
        }
        
        let newUserInfo = user._doc;
        // Remove sensitive information
        delete newUserInfo.password;

        newUserInfo.token = createToken(user);

        json.showOne(res, newUserInfo)       
    
    }catch(err){

        return json.errorResponse(res, err)
    }
}

o.verifyToken = async (req, res, next) => {

    const user = await User.findOne({ _id: req.decoded._id })

    if(!user){

        return json.errorResponse(res, 'User Not Exist!', 404)
    }

    json.showOne(res, user);
}

o.me = async (req, res, next) => {

    try{

        const user = await User.findOne({ _id: req.decoded._id })
            
        json.showOne(res, user)

    }catch(err) {
        
        return json.errorResponse(res, err)
    }
}

o.edit = async (req, res, next) => {

    try{

        let properties = {};
        (req.body.name)         ?  properties["name"]          = req.body.name  : "";
        (req.body.billingInfo)  ?  properties["billingInfo"]   = req.body.billingInfo  : "";
        (req.body.shippingInfo) ?  properties["shippingInfo"]  = req.body.shippingInfo  : "";
        (req.body.phone)        ?  properties["phone"]         = req.body.phone    : "";
        (req.body.image)        ?  properties["image"]         = req.body.image    : "";

        const updatedUser = await User.findOneAndUpdate({_id: req.decoded._id}, { $set: properties}, { upsert: true, new: true })

        json.showOne(res, updatedUser);

    }catch(err) {
        
        return json.errorResponse(res, err)
    }
}

o.forgetPassword = async (req, res, next) => {

    try{

        const user = await User.findOne({email: req.body.email})

        if(!user){

            return json.errorResponse(res, "Email Not Found", 404);
        }
        
        let tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        user.resetPasswordCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 Digit OTP
        user.resetPasswordExpires = tomorrow;

        await user.save()

        const html = await ejs.renderFile(path.join(__dirname, '../../../../resources/views/emails/forgot-password-email.ejs'), { resetPasswordCode: user.resetPasswordCode });
        email.send(user.email, "Forget Password?", html);

        json.showOne(res, {

            success: true
        });

    }catch(err) {
        
        return json.errorResponse(res, err)
    }
}

o.resetPasswordPage = async function(req, res, next){

    try{

        let code = false;
        let expiry = false;
        let success = false;

        if(req.query.code){

            const user  = await User.findOne({resetPasswordCode: req.query.code});
            code = (user) ? true : false;
            expiry = (user.resetPasswordExpires <= new Date()) ? true : false;
        }

        res.render('reset-password', {code: code, expiry: expiry, success: success});

    }catch(err) {
            
        return json.errorResponse(res, err)
    }
}

o.resetPasswordPageSubmission = async function(req, res, next){
    
    try{

        let code = false;
        let expiry = false;
        let success = false;

        if(req.query.code){
            
                let user  = await User.findOne({resetPasswordCode: req.query.code});
                code = (user) ? true : false;
                expiry = (user.resetPasswordExpires <= new Date()) ? true : false;
                if(code && !expiry){

                    user.resetPasswordExpires = new Date();
                    user.password = bcrypt.hashSync(req.body.password, 5);
                    await user.save();
                    success = true;
                }
        
        }

        res.render('reset-password', {code: code, expiry: expiry, success: success});

    }catch(err) {
                
        return json.errorResponse(res, err)
    }
}

o.resetPassword = async function(req, res, next){
    
    try{

        let code = false;
        let expiry = false;
        let success = false;
        let msg = "Unknown error occurred.";
        let statusCode = 500;
            
        let user  = await User.findOne({email: req.body.email, resetPasswordCode: req.body.code});
        code = (user) ? true : false;
        expiry = (user?.resetPasswordExpires <= new Date()) ? true : false;
        if(code && !expiry){

            user.resetPasswordExpires = new Date();
            user.password = bcrypt.hashSync(req.body.password, 5);
            await user.save();
            success = true;
        }

        if(success){
            msg = "Your password has been changed successfully."
            statusCode = 200
        }else if(!code){
            msg = "Invalid code!"
            statusCode = 404
        }else if(expiry){
            msg = "The code has been expired!",
            statusCode = 410;
        }

        json.showOne(res, {

            success: msg
        }, statusCode);
        

    }catch(err) {
                
        return json.errorResponse(res, err)
    }
}

module.exports = o;