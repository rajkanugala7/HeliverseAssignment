// routes/authRoutes.js
const express = require('express');
const { registerPrincipal, registerTeacher, registerStudent, loginUser, getPrincipal } = require('../controllers/authController');
const router = express.Router();

router.post('/register/principal', registerPrincipal);
router.get("/register/principal",getPrincipal);
router.post('/register/teacher', registerTeacher);
router.post('/register/student', registerStudent);
router.post('/login', loginUser);

module.exports = router;
