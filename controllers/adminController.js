const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Student = require("../models/Student");
const Feedback = require("../models/Feedback");
const mongoose = require("mongoose")

exports.getAdminDetails = async(req,res) => {
    try {
        const {admin} = req;
        return res.status(200).json({
            status:"success",
            admin
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.createAdmin = async(req,res,next) =>{
    try {
        const newAdmin = await Admin.create(req.body);
        return res.status(201).json({
            status:"success",
            data:{
                newAdmin
            }
        })
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

//transactional
exports.deleteStudent = async(req,res,next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {studentId} = req.body;
        await Course.
        /* check feedbacks need to be deleted? */
        /* exit student from courses */

        session.commitTransaction();
        return res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        session.abortTransaction();
        //console.log(error)
        return res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.deleteAdmin = async(req,res) => {
    try {
        const {id} = req.params;
        await Admin.findByIdAndDelete(id);
        res.status(204).json({
            status:"success",
            data:null
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.getAllAdmins = async(req,res) => {
    try {
        const allAdmins = await Admin.find();
        res.status(200).json({
            status:"success",
            data:{
                length:allAdmins.length,
                admins:allAdmins
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error
        })
    }
}

exports.updatePassword = async(req,res,next) => {
    try {
        const {currentPassword,newPassword,newPasswordConfirm} = req.body;
        const admin = await Admin.findById(req.admin._id).select('+adminPassword');
        if(!await Admin.correctPassword(currentPassword,admin.adminPassword)){
            return res.status(401).json({
                status:"fail",
                message:"Current Password is incorrect!"
            })
        }
        admin.adminPassword = newPassword;
        admin.passwordConfirm = newPasswordConfirm;
        await admin.save(); //runs validation again
        const token = signToken(admin._id);
        return res.status(200).json({
            status:"success",
            token:token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"fail",
            message:error
        })
    }
}