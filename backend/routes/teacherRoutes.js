const express=require("express");
const router=express.Router();


router.post("/teacher/updated",updatedTeacher);

module.exports=router;