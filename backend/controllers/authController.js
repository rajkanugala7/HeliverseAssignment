// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Principal = require('../models/Principal');
const Student=require("../models/Student");
const  Teacher=require("../models/Teacher");

exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      let user;
  
      if (role === 'principal') {
        user = await Principal.findOne({ email });
      } else if (role === 'teacher') {
        user = await Teacher.findOne({ email });
      } else if (role === 'student') {
        user = await Student.findOne({ email });
      }
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('Stored Hashed Password:', user.password); // Debugging
  
      // Compare the provided password with the stored hashed password
      const isMatch =  bcrypt.compare(password, user.password);
  
      console.log('Password:', password); // Debugging
      console.log('Password Match:', isMatch); // Debugging
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        token,
        user: { id: user._id, email: user.email, name: user.name, role }
      });
    } catch (error) {
      console.error('Server Error:', error.message); // Debugging
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  

exports.registerPrincipal = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    let principal = await Principal.findOne({ email });
    if (principal) {
      return res.status(400).json({ message: 'Principal already exists' });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new Principal
    principal = new Principal({ email, password: hashedPassword, name });
    await principal.save();

    res.status(201).json({ message: 'Principal registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


exports.registerTeacher = async (req, res) => {
    const { email, password, name } = req.body;
  
    try {
      let teacher = await Teacher.findOne({ email });
      if (teacher) {
        return res.status(400).json({ message: 'Teacher already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      teacher = new Teacher({ email, password: hashedPassword, name });
      await teacher.save();
  
      res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };
  
  exports.registerStudent = async (req, res) => {
    const { email, password, name, rollNo, cgpa, classroomId } = req.body;
  
    try {
      let student = await Student.findOne({ email });
      if (student) {
        return res.status(400).json({ message: 'Student already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      student = new Student({ email, password: hashedPassword, name, rollNo, cgpa, classroom: classroomId });
      await student.save();
  
      res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };
  

  exports.getPrincipal = async (req, res) => {
    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const principal = await Principal.findOne({ email: email });

        if (!principal) {
            return res.status(404).json({ message: 'Principal not found' });
        }

        res.json({ ...principal._doc }); // Use _doc to get the raw document

    } catch (error) {
        console.error('Error fetching principal:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.getTeachear = async (req, res) => {
  try {
      const { email } = req.query;
      
      if (!email) {
          return res.status(400).json({ message: 'Email is required' });
      }

      const teacher = await Teacher.findOne({ email: email });

      if (!teacher) {
          return res.status(404).json({ message: 'teacher not found' });
      }

      res.json({ ...teacher._doc }); // Use _doc to get the raw document

  } catch (error) {
      console.error('Error fetching principal:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
