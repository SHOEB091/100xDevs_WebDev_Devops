const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Define a JWT secret key for token signing and verification
const JWT_SECRET = "your-secret-key"; // In production, use environment variables

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});



function auth(req,res,next){
    //1 . Extract Toekn from request Headers 
    const token = req.headers.token;

    //2. Check if token is exists 
    if(!token){
        return res.status(401).json({message:"No toekn provided , authorization denied"});
    }

    try{
        //3. verify the token
        const decodeData = jwt.verify(token,JWT_SECRET);

        //4. Add the user info to the request;
        req.user = decoded;

        //5. Call next() to continue to the protected route
        next();
    }catch(error){
        res.stattus(401).json({message: "Invalid token , Authorization denied"})
    }
}
