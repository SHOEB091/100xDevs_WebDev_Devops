const express = require('express');
const adminRouter = express.Router();

const {adminSignup , adminSignin} = require('../controllers/adminAuthController')

adminRouter.post('/signup',adminSignup);
adminRouter.post('/signin',adminSignin);

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