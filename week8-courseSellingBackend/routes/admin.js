const express = require('express');
const adminRouter = express.Router();
const Course= require('../models/course')
const {adminMiddleware}=require('../middleware/admin')

const {adminSignup , adminSignin} = require('../controllers/adminAuthController');


adminRouter.post('/signup',adminSignup);
adminRouter.post('/signin',adminSignin);

adminRouter.post('/course',adminMiddleware,async (req,res)=>{
    const adminId = req.userId;

    const{title, description, imageUrl, price}= req.body;

    const course = await courseModel.create({
        title, 
        description, 
        imageUrl, 
        price, 
        creatorId: adminId
    })

    res.status(200).json({
        message:"creat course endpoints",
        courseId: course._id

    });
})



//Get all Courses
adminRouter.get('/course',adminMiddleware,async(req,res)=>{
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching courses" });
    }
})



//Get a Particular Course detail
adminRouter.get('/course/:id',adminMiddleware,async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id);
        if(!course) return res.status(404).json({message:"Course not found"})
            res.status(200).json(course);  
    }catch(err){
        res.status(500).json({ message: "Error fetching course" });
    }
})

//easy update method 

// adminRouter.put("/course", adminMiddleware, async function(req, res) {
//     const adminId = req.userId;

//     const { title, description, imageUrl, price, courseId } = req.body;

//     // creating a web3 saas in 6 hours
//     const course = await courseModel.updateOne(
//         { _id: courseId },
            // {creatorId:adminId},
//         {
//             title: title,
//             description: description,
//             imageUrl: imageUrl,
//             price: price
//         }
//     );

//     res.json({
//         message: "Course updated",
//         courseId: course._id
//     });
// });

// adminRouter.put('/course/:id', adminMiddleware, async (req, res) => {
//     try {
//         const updatedCourse = await Course.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
//         res.json(updatedCourse);
//     } catch (err) {
//         res.status(500).json({ message: "Error updating course" });
//     }
// });

//Update the Course 
adminRouter.put('/course/:id', adminMiddleware, async (req, res) => {
    const id = req.params.id;
    const { title, description, price, imageUrl } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (imageUrl) updateData.imageUrl = imageUrl;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json({ message: "Error updating course" });
    }
});

//Delete Course 

adminRouter.delete('/course/:id', adminMiddleware, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
    } catch (err) {
        res.status(500).json({ message: "Error deleting course" });
    }
});


module.exports= adminRouter;