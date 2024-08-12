// middlewares/validateStudent.js
const { check, validationResult } = require('express-validator');

exports.validateStudentData = [
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('name').not().isEmpty().withMessage('Name is required'),
  check('rollNo').not().isEmpty().withMessage('Roll number is required'),
  check('cgpa').isFloat({ min: 0, max: 10 }).withMessage('CGPA must be between 0 and 10'),
  check('classroomId').not().isEmpty().withMessage('Classroom ID is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
