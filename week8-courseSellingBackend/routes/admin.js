const express = require('express');
const adminRouter = express.Router();

const {userSignup , userSignin} = require('../controllers/authController')

adminRouter.post('/signup',userSignup);
adminRouter.post('/signin',userSignin);

adminRouter.post('/course',(req,res)=>{
    res.status(200).json({message:"creat course endpoints"});
})
adminRouter.put('/course',(req,res)=>{
    res.status(200).json({message:"creat course endpoints"});
})
adminRouter.get('/course',(req,res)=>{
    res.status(200).json({message:"creat course endpoints"});
})



module.exports= adminRouter;