const express=require("express");
const { markAttendance,  getAttendanceOfSubject ,getAttendanceOfStudent, isTodayClass, getAllAbsentees } = require("../Controllers/attendanceController");

const router=express.Router();

router.route("/isTodayClass").get(isTodayClass)
router.route("/markAttendance/:id").post(markAttendance)
router.route("/getAttendanceOfSubject/:id").get(getAttendanceOfSubject)
router.route("/getAttendanceOfStudent").get(getAttendanceOfStudent)
router.route("/getAllAbsentees/:_id").get(getAllAbsentees)

module.exports=router 