// routes/classroomRoutes.js
const express = require('express');
const { createClassroom } = require('../controllers/classroomController');
const { authenticate } = require('../middlewares/authenticate');
const router = express.Router();

router.post('/create', authenticate, createClassroom); // Protected route

module.exports = router;
