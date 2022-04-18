const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const {checkId} = require("../utilities/Email/checkEmail")
const {login,signup,protect,restrictTo} = require("../controllers/Auth/adminAuth")
const {getAdminDetails,deleteAdmin,getAllAdmins,createAdmin,deleteStudent,updatePassword} = require("../controllers/adminController");

/* SIGNING IN NEEDS TO CHECK IN EACH OF THREE FOR EMAIL? */

router.post("/createAdmin",protect,restrictTo("admin"),checkId,createAdmin);

router.post("/login",login); //may change

router.get("/:adminId",protect,restrictTo("admin"),getAdminDetails);

router.get("/allUsers",restrictTo("admin"),getAllAdmins);

/* remove :id can get from req */
/* /deleteAdmin */
router.delete("/deleteUser/:id",protect,restrictTo("admin"),deleteAdmin);

/* impl below all */
router.delete("/deleteStudent/:studentId",protect,restrictTo("admin"),deleteStudent);

//router.delete("/deleteCourse/:courseId",protect,restrictTo("admin"),deleteCourse);

//router.delete("/deleteInstructor/:instructorId",protect,restrictTo("admin"),deleteInstructor);

router.patch("/updateDetails/password",protect,restrictTo("admin"),updatePassword);

/* CHECK ROUTE AGAIN */
router.patch("/updateDetails/:id", async(req,res) => {
    try {
        const {id,body} = req.params;
        const updatedDetails = await Admin.findByIdAndUpdate(id,body, {
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