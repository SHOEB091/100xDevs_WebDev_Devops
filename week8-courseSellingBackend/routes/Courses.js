const express = require('express');

const courseRouter = express.Router();



courseRouter.post('/purchase',(req,res)=>{
    // in real world yo would accept use to pay money to buy the course 
    res.status(200).json({message:"purchased Course"})
})


//to get all the current courses which show on websites
courseRouter.get('/course',(req,res)=>{
    res.status(200).json({essage:"Get Course endpoints"});
})


courseRouter.get('/preview',(req,res)=>{
    res.status(200).json({essage:"Course Preview endpoints"});
})


module.exports= courseRouter;