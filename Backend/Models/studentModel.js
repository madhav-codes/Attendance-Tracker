const mongoose=require("mongoose")

const studentInformation= new mongoose.Schema({
    rollNo:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        select:false,
        required:true
    }
});

const Student=new mongoose.model("Student",studentInformation);

module.exports=Student
