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

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ message: "You are not signed in" });
    }
}

module.exports={
    adminMiddleware: adminMiddleware
}