const Subject=require("../Models/subjectModel")

exports.Register= async(req,res)=>{
    try{
        const subject=await Subject.create(req.body)
        res.status(200).json({message:"Registered Succesfully",
                                subject})
    }
    catch(e){
        console.log(e)
    }
}


exports.getAllSubjects= async(req,res)=>{
    try{
        const subject=await Subject.find({})
        res.status(200).json({subject})
    }
    catch(e)
    {
            console.log(e)
    }
}

exports.removeSubject= async(req,res)=>{
    try{
        const subject=await Subject.findByIdAndDelete(req.params.__id);
        res.status(200).json({message:"Subject Removed"})  
    }
    catch(e){
        console.log(e)
    }
}


