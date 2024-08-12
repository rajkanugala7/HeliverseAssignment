const express = require('express');
const studentController = require('../controllers/studentController');
const { validateStudentData } = require('../middlewares/validateStudent');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.post('/students', authenticate, validateStudentData, studentController.createStudent);
router.get('/students', authenticate, studentController.getAllStudents);
router.get('/students/:id', authenticate, studentController.getStudentById);
router.put('/students/:id', authenticate, validateStudentData, studentController.updateStudent);
router.delete('/students/:id', authenticate, studentController.deleteStudent);

module.exports = router;
