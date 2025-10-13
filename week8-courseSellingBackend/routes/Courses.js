const express = require('express');
const Purchase = require('../models/purchases')
const Course = require('../models/course')
const courseRouter = express.Router();
const {userMiddleware} = require('../middleware/user')


courseRouter.post('/purchase',userMiddleware,async(req,res)=>{
    // in real world yo would accept use to pay money to buy the course 
    const userId = req.userId;
    const courseId = req.body.courseId;

    //should check that the user has actually paid the price
    await Purchase.create({
        userId,
        courseId
    })

    res.status(200).json({message:"You have purchased the course Successfully"})
})





courseRouter.get('/preview',async(req,res)=>{

    const courses = await Course.find({});

    res.status(200).send(courses);
})


module.exports= courseRouter;