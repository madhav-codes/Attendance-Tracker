const express=require("express")
const bodyParser=require("body-parser")


const app=express()

app.use(express.json({
    limit: "50mb"
}))

app.use(bodyParser.urlencoded({
    limit:"50mb",
    extended:true 
}))

const student=require("./Routes/studentRoute")
const subject=require("./Routes/subjectRoute")
const enrollment=require("./Routes/enrollmentRoute")
const attendance=require("./Routes/attendanceRoute")



app.use("/api/v1/student",student)
app.use("/api/v1/subject",subject)
app.use("/api/v1/enrollment",enrollment)
app.use("/api/v1/attendance",attendance)


module.exports=app

