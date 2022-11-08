const mongoose=require("mongoose")

const subjectList= new mongoose.Schema({
    subjectCode:{
        type:String,
        required:true,
        unique:true
    },
    subjectName:{
        type:String
        // required:true
    },
    teacher:{
        type:String,
        required:true
    },
    totalClasses:{
        type:Number,
        default:0
    }
    
});

const Subject=new mongoose.model("Subject",subjectList)

module.exports=Subject;