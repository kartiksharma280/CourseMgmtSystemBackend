const mongoose = require("mongoose");

/* ADD VALIDATOR VIA PACKAGE FOR EMAIL  */
const instructorSchema = new mongoose.Schema({
    instructorEmail:{
        type:String,
        required:[true,"Please provide a mail!"]
    },
    instructorName:{
        type:String,
        required:[true,"Please provide a name!"]
    },
    instructorPassword:{
        type:String,
        required:[true,"Please provide a password!"]
    },
    instructorContact:{
        type:String
    },
    instructorAddress:{
        type:String
    }

})

const Instructor = mongoose.model("Instructor",instructorSchema);
module.exports = Instructor;