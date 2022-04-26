const mongoose = require("mongoose");

//no of lectures
//creatification boolean

const courseSchema = new mongoose.Schema({
    courseTitle:{
        type:String,
        required:[true,"Please provide a title!"]
    },
    courseDescription:{
        type:String,
        maxlength:100,
        minlength:20
    },
    courseDuration:{
        type:String //CAN BE DATE
    },
    courseLevel:{
        type:String, //set radio button in frontend,
        required:[true,"Course level must be given!"]
    },
    courseDescription:{
        type:String,
        maxlength:100,
        minlength:20,
        required:[true,"Please provide a suitable description of 20-100 words!"]
    },
    courseCode:{
        type:String,
        required:[true,"Please provide a course code"]
    },
    enrolledCandidates:{
        type:Number, //COUNT FROM M:N RELTN TABLE BW STUDENTS AND COURSES
        default:0
    },
    credits:{
        type:Number
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Instructor"
    },
    studentFeedbacks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Feedback"
    }],
    enrolledStudents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }]
})

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;