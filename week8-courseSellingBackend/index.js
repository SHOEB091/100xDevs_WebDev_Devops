require('dotenv').config()
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth')
const userRouter = require('./routes/user');
const courseRouter = require('./routes/Courses');
const adminRouter = require('./routes/admin')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ...existing code...
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/course-selling')
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(err => {
    console.error('mongodb connection error:', err.message);
  });
// ...existing code...


app.get('/',(req,res)=>{
    res.status(200).send("Server is up and running");
})

app.use('/auth',authRoutes);

app.use('/user',userRouter);

app.use('/courses',courseRouter)

app.use('/admin',adminRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})