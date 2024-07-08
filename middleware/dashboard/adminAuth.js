const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");

require('dotenv').config({path : `${process.cwd()}/.env`});


module.exports.adminAuthenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userExist = await User.findOne({where : {id : decodeToken.id, role :decodeToken.role }});
        if(!userExist || userExist.role !== "admin"){
            return res.status(401).send({error : "Authentication Failed!"});
        }
        req.token = token;
        req.user = userExist;
        req.userId = userExist._id;
        next();
    } catch (error) {
        res.status(401).send({error : "Authentication Failed!"});
    }
}




