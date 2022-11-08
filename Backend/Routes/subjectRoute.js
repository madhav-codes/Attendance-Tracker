const express=require("express");
const { Register, getAllSubjects, removeSubject } = require("../Controllers/subjectController");

const router=express.Router();
router.route("/Register").post(Register)
router.route("/getAllSubjects").get(getAllSubjects)
router.route("/removeSubject/:__id").delete(removeSubject)



module.exports=router;