const express=require("express");
const { enrollStudent,getAllSubjectsOfStudent,getAllStudentsOfSubject } = require("../Controllers/enrollmentController");

const router=express.Router();

router.route("/enrollStudent/:id").post(enrollStudent)
router.route("/getAllSubjectsOfStudent").get(getAllSubjectsOfStudent)
router.route("/getAllStudentsOfSubject").get(getAllStudentsOfSubject)




module.exports=router