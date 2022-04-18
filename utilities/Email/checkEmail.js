const Admin = require("../../models/Admin");
const Instructor = require("../../models/Instructor");
const Student = require("../../models/Student");

exports.checkId = async(req,res,next) => {
    const {email} = req.body;
    try {
        const instructor = await Instructor.find({email:email});
        const student = await Student.find({email:email});
        const admin = await Admin.find({email:email});
        if(instructor.length!==0 || student.length!==0 || admin.length!==0){
            return res.status(400).json({
                status:"fail",
                message:`Account with Email ${email} already exists!`
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:"fail",
            message:error
        })
    }
    next();
}