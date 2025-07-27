//Can you try creating a middleware called auth that verifies if a user is logged in and ends the request early if the user isn’t logged in?

const jwt = require("jsonwebtoken");
const JWT_SECRET = "hellosecret";

function auth (req,res,next){
    //1. Extract token from the headers 
    const token = req.headers.token;

    //2. Check if tokens exists
    if(!token){
        return res.status(400).json({message: "Invalid Tokin"});
    }

    try{
        //3. verify the token 
        const decodeData = jwt.verify(token,JWT_SECRET);

        req.user = decodeData;
        next();
    } catch(error){
        res.status(401).json({message: "Invalid toen , Authorization denied"});
    }

}

module.exports = auth;
