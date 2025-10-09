const express = require('express');

const router = express.Router();

//To get all the current courses which show on purchases where user purchase course shows 
app.post('/user/purchases',(req,res)=>{
    res.status(200).json({essage:"signup endpoints"})
    
})

app.post('/course/purchase',(req,res)=>{
    // in real world yo would accept use to pay money to buy the course 
    res.status(200).json({message:"purchased Course"})
})


//to get all the current courses which show on websites
app.get('/courses',(req,res)=>{
    res.status(200).json({essage:"signup endpoints"});
})