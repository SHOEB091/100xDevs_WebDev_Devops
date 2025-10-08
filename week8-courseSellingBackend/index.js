require('dotenv').config()
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.Mongoose || 'mongodb://127.0.0.1:27017/course-selling')
.then(()=>{
    console.log('mongodb connected')
});


app.get('/',(req,res)=>{
    res.status(200).send("Server is up and running");
})

app.use('/auth',authRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})