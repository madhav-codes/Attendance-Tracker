const Enrollment = require("../Models/enrollmentModel")
const Student = require("../Models/studentModel")
const Subject = require("../Models/subjectModel")

exports.enrollStudent = async (req, res) => {
    try {
        // console.log(req.params.id)
        // console.log(req.body.subjectId)
        const student = req.params.id
        const subject = req.body.subjectId
        const exist = await Enrollment.findOne({
            $and: [
                { studentId: student },
                { subjectId: subject }
            ]
        })

        // console.log(exist)
        // console.log(student)
        // console.log(subject)

        if (exist) {
            res.status(409).json({ message: "Already Enrolled" })
            return
        }
        else {
            const enrollment = await Enrollment.create({
                studentId: student,
                subjectId: subject
            })
            res.status(200).json({
                message: "Enrollment Succesfull",
                enrollment
            })
        }
    }
    catch (e) {
        console.log(e)
    }
}


exports.getAllSubjectsOfStudent=async(req,res)=> {
    try{
            const {studentId}=req.body
            const subjects= await Enrollment.find({studentId:studentId})
            const student=await Student.findOne({_id:studentId})
            if(!student){
                res.status(404).json({
                    message:"Student not registered"
                }) 
            }
           else if(subjects.length==0){
                res.status(404).json({
                    message:"Student not enrolled in any Subject"
                })
            }
            else{
                res.status(200).json({
                    message:"All Subjects:",
                    subjects
                })
            }

    }
    catch(e){
            console.log(e)
    }

}



exports.getAllStudentsOfSubject=async(req,res)=> {
    try{
            const {subjectId}=req.body
            const students= await Enrollment.find({subjectId:subjectId})
            const subject=await Subject.findOne({_id:subjectId})
            if(!subject){
                res.status(404).json({
                    message:"Subject is not registered"
                }) 
            }
           else if(students.length==0){
                res.status(404).json({
                    message:"No Student is enrolled in the particular subject"
                })
            }
            else{
                res.status(200).json({
                    message:"All Student:",
                    students
                })
            }

    }
    catch(e){
            console.log(e)
    }

}



