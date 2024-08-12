const express=require("express");
const { getAllTeachers, deleteTeacher, updateTeacher } = require("../controllers/teacherController");
const router=express.Router();


router.post("/updated",updateTeacher);
router.get("/allteachers", getAllTeachers);
router.post("/delete", deleteTeacher);


module.exports=router;