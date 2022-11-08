const mongoose=require("mongoose")

const enrollmentList=new mongoose.Schema({

    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    }

})

const Enrollment= new mongoose.model("Enrollment",enrollmentList);

module.exports=Enrollment;
