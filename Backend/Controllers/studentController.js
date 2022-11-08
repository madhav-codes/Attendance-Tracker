const Student=require("../Models/studentModel")

exports.Register= async(req,res)=>{
    try{
        const student=await Student.create(
           req.body
        )
        // console.log(student)

        res.status(200).json({message:"Registered Succesfully",
                                student})
    }
    catch(e){
        console.log(e)
    }
}

exports.getAllStudents= async(req,res)=>{
    try{
        const student=await Student.find({})
        res.status(200).json({student})
    }
    catch(e)
    {
            console.log(e)
    }
}

exports.removeStudent= async(req,res)=>{
    try{
        const student=await Student.findByIdAndDelete(req.params.__id);
        res.status(200).json({message:"Student Removed"})  
    }
    catch(e){
        console.log(e)
    }
}
