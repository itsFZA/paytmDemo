const jwt = require('jsonwebtoken');
const {jwt_secret} = require('./config')


const authMiddleware = (req,res,next) =>{
    const tokenAvailable = req.headers.authorization
    console.log(`token available? ${tokenAvailable}`);

    if(tokenAvailable){
        const token = tokenAvailable.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token,jwt_secret)
        console.log(decoded);
        req.userid =  decoded.newUserId? decoded.newUserId :decoded.userid
        console.log(req.userid);
        next()
    }else{
        res.status(403).json({success:false,message:"token not provided"})
    }
}

module.exports = {
    authMiddleware
}