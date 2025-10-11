const express = require('express');
const userRouter = express.Router();


//To get all the current courses which show on purchases where user purchase course shows 
userRouter.post('/purchases',(req,res)=>{
    res.status(200).json({essage:"signup endpoints"})
    
})


module.exports = userRouter;