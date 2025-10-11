const express = require('express');
const {Router} = require('express');
const userRouter = Router();


//To get all the current courses which show on purchases where user purchase course shows 
router.post('/purchases',(req,res)=>{
    res.status(200).json({essage:"signup endpoints"})
    
})


module.exports = userRouter;