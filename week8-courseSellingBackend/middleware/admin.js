const jwt = require("jsonwebtoken")


//higher order function 
/*
const jwt = require("jsonwebtoken");

// Higher order middleware
function middleware(password) {
    return function (req, res, next) {
        const token = req.headers.token;
        try {
            const decoded = jwt.verify(token, password);
            req.userId = decoded.id;
            next();
        } catch (err) {
            res.status(401).json({ message: "Invalid or missing token" });
        }
    };
}

module.exports = { middleware };
*/

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN)

    if(decoded){
        req.userId = decode.id;
        next()
    }
    else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }

}

module.exports={
    adminMiddleware: adminMiddleware
}