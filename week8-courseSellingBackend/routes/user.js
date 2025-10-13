const express = require('express');

const {userSignup , userSignin} = require('../controllers/authController')
const userRouter = express.Router();
const {userMiddleware}=require('../middleware/user.js');
const Course = require('../models/course.js')
const Purchase = require('../models/purchases.js');


userRouter.post('/signup',userSignup);
userRouter.post('/signin',userSignin);

//To get all the current courses which show on purchases where user purchase course shows 
userRouter.get('/purchases',userMiddleware,async(req,res)=>{

    const userId = req.userId;
    const purchases = await Purchase.find({
            userId
        })

    const courseData = await Course.find({
        _id:{$in:purchases.map(x => x.courseId)}
    }) 
        
    res.status(200).json({
        purchases,
        courseData

    });
    
})


module.exports = userRouter;