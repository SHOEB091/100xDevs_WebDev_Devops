const jwt = require('jsonwebtoken');
const JWT_SECRET = "your-secret-key";

//in memory user storage 
const users = [];

//signup handler 

function signup(req,res){
    const{username,password} = req.body;

    //basic validation 
    if(!username || ! password){
        return res.status(400).json({message: "Please provide username and password"});
    }

    //Check if user already exists 
    const existingUser = users.find(user => user.username === username);
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }

    //Create new User
    const newUser = {
        id: users.length + 1,
        username,
        password, // In real world, you would hash this  
    };
    //Save user to "database"
    users.push(newUser);

    //Generate JWT token
    const token = jwt.sign({id: newUser.id, username: newUser.username}, JWT_SECRET, {expiresIn:'1h'});

    //Return success with token 
    res.status(201).json({
        message: "User created successfully",
        token
    });

}

//Login handler 
function signin(req,res){
    const {username,password} = req.body;

    // Basic validation
    if(!username || !password){
        return res.status(400).json({message: "Please provide usernane and password "})
    }

    //Find user in "database"
    const user = users.find(user => user.username === username);
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    
    // Return token
    res.json({ 
        message: "Login successful",
        token 
    });
}
// Protected profile handler
function getProfile(req, res) {
    // Find user info (req.user comes from the auth middleware)
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    // Return user data (excluding password)
    const { password, ...userWithoutPassword } = user;
    res.json({
        message: "Profile data retrieved successfully",
        user: userWithoutPassword
    });
}
module.exports = {
    signup,
    signin,
    getProfile
};
