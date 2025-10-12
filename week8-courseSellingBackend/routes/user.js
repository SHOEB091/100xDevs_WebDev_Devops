const express = require('express');

const {userSignup , userSignin} = require('../controllers/authController')
const userRouter = express.Router();

userRouter.post('/signup',userSignup);
userRouter.post('/signin',userSignin);

//To get all the current courses which show on purchases where user purchase course shows 
userRouter.post('/purchases',(req,res)=>{
    res.status(200).json({essage:"signup endpoints"})
    
})


module.exports = userRouter;