//Can you try creating a middleware called auth that verifies if a user is logged in and ends the request early if the user isn’t logged in?

const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key";  // Make sure this matches the secret in userhandler.js

function auth (req,res,next){
    //1. Extract token from the headers 
    const token = req.headers.token;

    //2. Check if tokens exists
    if(!token){
        return res.status(401).json({message: "No token provided, authorization denied"});
    }

    try{
        //3. verify the token 
        const decodeData = jwt.verify(token,JWT_SECRET);

        req.user = decodeData;
        next();
    } catch(error){
        res.status(401).json({message: "Invalid token, authorization denied"});
    }

}

module.exports = auth;
