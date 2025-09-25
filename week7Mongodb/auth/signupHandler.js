const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Users = require('../models/users');


async function signup(req,res){
    const{username,passowrd}=req.body;

    try{//basic validation 
    if(!username || ! passowrd){
        return res.status(400).json({message: "Please provide username and password"});
    }

    //Check if user already exists 
    const existingUser = users.find(user => user.username === username && user.email === email);
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
    await users.save(newUser);

    //Generate JWT token
    const token = jwt.sign({id: newUser.id, username: newUser.username}, JWT_SECRET, {expiresIn:'1h'});
    
    //Return success with token 
    res.status(201).json({
        message: "User created successfully",
        token
    });

    }catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: "Server error", error: err.message });

    }
}
module.exports = signup;