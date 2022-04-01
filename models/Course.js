const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseTitle:{
        type:String,
        required:[true,"Please provide a title!"]
    },
    courseDuration:{
        type:String //CAN BE DATE
    },
    courseCode:{
        type:String,
        required:true
    },
    enrolledCandidates:{
        type:Number, //COUNT FROM M:N RELTN TABLE BW STUDENTS AND COURSES
    },
    credits:{
        type:Number
    }
})

const Course = mongoose.model("Course",courseSchema);