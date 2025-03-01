const express = require("express");
const router = express.Router();
const Instructor = require("../models/Instructor");
const {deleteInstructor,getAllInstructors,getInstructorCourses,getInstructorDetails,createCourse,deleteCourse,checkInstructorExists,giveFeedback,deleteFeedback,updatePassword} = require("../controllers/instructorController")
const {checkId} = require("../utilities/Email/checkEmail")
const {checkFeedbackGiven} = require("../utilities/feedbacks/checkFeedbackGiven")
const {login,restrictTo,protect,signup} = require("../controllers/Auth/instructorAuth")

router.post("/signup",checkId, signup);

router.post("/login",login);

router.post("/createCourse",protect,restrictTo("instructor"),createCourse);

/* get feedbacks by instructorId specific */
router.post("/:courseId/feedback",protect,restrictTo("instructor"), checkFeedbackGiven,giveFeedback);


router.get("/allUsers",getAllInstructors);

router.get("/:instructorId",protect,getInstructorDetails);

router.get("/:id/allCourses",checkInstructorExists,getInstructorCourses);

//router.delete("/deleteUser/:id",protect,restrictTo("admin","instructor"), deleteInstructor);

//router.delete("/course/:courseId",protect,restrictTo("instructor"),deleteCourse);

router.delete("/:courseId/feedback",protect,restrictTo("instructor"),deleteFeedback);

router.patch("/updateDetails/password",protect,restrictTo("instructor",updatePassword))

/* CHECK ROUTE AGAIN */
router.patch("/updateDetails/:id", async(req,res) => {
    try {
        const {id,body} = req.params;
        const updatedDetails = await Instructor.findByIdAndUpdate(id,body, {
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:"success",
            data:{
                details:updatedDetails
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
})

module.exports = router;