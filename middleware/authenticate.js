const jwt = require("jsonwebtoken");
const user = require("../db/models/user");
require('dotenv').config({path : `${process.cwd()}/.env`});


module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userExist = await user.findOne({_id : decodeToken.userId});
        if(!userExist){
            return res.status(401).send({error : "Authentication Failed!"});
        }
        req.token = token;
        req.user = userExist;
        req.userId = userEXist._id;
        next();
    } catch (error) {
        res.status(401).send({error : "Authentication Failed!"});
    }
}
// module.exports.localVairables = (req, res, next)=>{
//     req.app.locals = {
//         OTP : null,
//         resetSession : false,
//     }
//     next();
// }