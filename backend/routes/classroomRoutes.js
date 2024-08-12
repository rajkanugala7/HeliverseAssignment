// routes/classroomRoutes.js
const express = require('express');
const { createClassroom, updateClassroom, getAllClassrooms, deleteClassroom } = require('../controllers/classroomController');
const { authenticate } = require('../middlewares/authenticate');
const router = express.Router();

router.post('/create', authenticate, createClassroom); // Protected route
router.post("/update", authenticate,updateClassroom);
router.get("/getClassrooms", getAllClassrooms);
router.post("/delete", deleteClassroom);
module.exports = router;
