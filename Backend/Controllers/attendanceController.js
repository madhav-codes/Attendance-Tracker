const Attendance = require("../Models/attendanceModel")
const Enrollment = require("../Models/enrollmentModel")
const Student = require("../Models/studentModel")
const Subject = require("../Models/subjectModel")

exports.isTodayClass = async (req, res) => {
    try {
        const { subjectId } = req.body
        if (!subjectId || subjectId == "") {
            res.json({
                message: "There is no class today"
            })
        }
        else {
            const subject = await Subject.findOne({ _id: subjectId })

            if (!subject) {
                res.status(404).json({
                    message: "invalid Subject"
                })
            }
            else {
                const n = subject.totalClasses
                subject.totalClasses = n + 1;
                await subject.save();
                res.status(200).json({
                    message: "Total classes:",
                    subject
                })
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}

exports.markAttendance = async (req, res) => {
    try {
        const student = req.body.studentId
        const subject = req.params.id
        const date = { $gt: new Date().setHours(0, 0, 0, 0) }


        // DATE TESTING 

        // console.log(new Date().setHours(0, 0, 0, 0))
        // console.log(typeof(new Date().toLocaleDateString()))  // only date
        // console.log(new Date("10/15/2021"))
        // // 2019-09-11T05:55:00.480Z
        // console.log(new Date())

        // console.log(new Date().toString())// for local time IST (Sun Oct 23 2022 14:14:25 GMT+0530 (India Standard Time))
        // const d1=new Date().toLocaleString() //local time (23/10/2022, 14:14:25)
        // console.log(d1)
        // const d2=d1.substr(0,10)
        // console.log(d2)
        // console.log(typeof(d2))

        // const d = new Date()
        // var dInString = JSON.stringify(d)
        // // console.log(dInString)
        // var dateOnly = dInString.substr(1, 10)
        // console.log(typeof (dateOnly))
        // console.log(dateOnly)


        const exist = await Attendance.findOne({
            $and: [
                { studentId: student },
                { subjectId: subject },
                // {date: date}
                { date: date }
            ]
        })

        const enrolled = await Enrollment.findOne({
            $and: [
                { studentId: student },
                { subjectId: subject }
            ]
        })
        // console.log(enrolled)
        // console.log(exist)

        if (exist) {
            res.status(409).json({
                message: "Attendance already marked"
            })
        }
        else if (enrolled) {
            const attendance = await Attendance.create({
                subjectId: subject,
                studentId: student,
                // date: new Date().setHours(0,0,0,0)
                // date:dateOnly
            })

            res.status(200).json({
                message: "Attendance marked",
                attendance
            })
        }
        else {
            res.status(404).json({
                message: "Student not enrolled in particular Subject"
            })
        }
    }

    catch (e) {
        console.log(e)
    }
}

exports.getAttendanceOfSubject = async (req, res) => {
    try {
        const { subjectId } = req.body
        const date = { $gt: new Date().setHours(0, 0, 0, 0) }

        const attendance = await Attendance.find({ subjectId: subjectId, date: date })
        const subject = await Subject.find({ _id: subjectId })
        const totalStudentPresent = attendance.length;
        const enrollment = await Enrollment.find({ subjectId: subjectId })
        const totalStrength = enrollment.length
        // const subjectCode=subject.subjectCode
        console.log(subject.subjectCode)//unable to fetch studentId
        res.status(200).json({
            subject, totalStudentPresent, totalStrength
        })

    }
    catch (e) {
        console.log(e)
    }
}


exports.getAttendanceOfStudent = async (req, res) => {
    try {
        const { studentId } = req.body
        const attendance = await Attendance.find({ studentId: studentId })


        var uniqueSubject = [];
        var present = [];
        for (var i in attendance) {
            const a = attendance[i].subjectId;
            let f = 1;
            for (var j in uniqueSubject) {
                if (uniqueSubject[j] == a) {
                    console.log(j)
                    present[j] = present[j] + 1;
                    f = 0;
                }
            }
            if (f == 1) {
                const l = uniqueSubject.length
                uniqueSubject[l] = a;
                present[l] = 1;
            }
        }

        const studentAttendance = [];
        var overallPresent = 0, overallClasses = 0;
        const student = await Student.findOne({ _id: studentId })
        const studentRollNo = student.rollNo
        for (var i in uniqueSubject) {
            let p = present[i];
            const subject = await Subject.findOne({ _id: uniqueSubject[i] });
            let t = subject.totalClasses;
            overallClasses = overallClasses + t;
            overallPresent = overallPresent + p;
            const percentage = p / t * 100;
            const subjectCode = subject.subjectCode;
            // console.log("totalclasses "+t)
            studentAttendance[i] = "SUBJECT-CODE: " + subjectCode + ", PRESENT: " + p + ", TOTAL CLASSES: " + t + ", PERCENTAGE: " + percentage;
        }
        let overallAttendancePercentage = overallPresent / overallClasses * 100;
        
        // for(i in studentAttendance)
        //  console.log(studentAttendance[i])
        //  console.log(studentAttendance.length)

        res.json({
            studentRollNo, studentAttendance, overallPresent, overallClasses, overallAttendancePercentage
        })

    }
    catch (e) {
        console.log(e)
    }
}

exports.getAllAbsentees = async (req, res) => {
    try {
        const id = req.params._id;
        let {date} = req.query;
        console.log(typeof(date))

        if(date)
        {   var dateInString = JSON.stringify(date) // object to string so that we can change its property
            dateInString = dateInString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`) //regex f'n to place $ , /g-global
            var dateInObject = JSON.parse(dateInString) // string to object
        }

        const absentees = []
        const enrolled = await Enrollment.find({ subjectId: id })
        const present = await Attendance.find({ subjectId: id, date: dateInObject })
        let f=0;
        for(var i in enrolled){
            for(var j in present){
                if(enrolled[i].studentId==present[j].studentId){
                    f=1;
                    // console.log("hi")
                }
            }
            if(f==0){
               absentees[i] =enrolled[i];
               f=0;
            }
        }
        res.status(200).json({
            present,
            totalStudent:enrolled.length,
            noOfAbsentees:absentees.length,
            Subject:id,
            Absentees:absentees
        })

    }
    catch (e) {
        console.log(e)
    }
}