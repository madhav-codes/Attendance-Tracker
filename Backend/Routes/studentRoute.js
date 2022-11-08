const express=require("express");
const { Register, getAllStudents, removeStudent } = require("../Controllers/studentController");

const router=express.Router();
router.route("/Register").post(Register)
router.route("/getAllStudents").get(getAllStudents)
router.route("/removeStudent/:__id").delete(removeStudent)




module.exports=router;