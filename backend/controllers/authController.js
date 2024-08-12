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

    // Check user role and find the user in the corresponding model
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

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role },  // Payload contains user ID and role
      process.env.JWT_SECRET,  // Secret key from environment variables
      { expiresIn: '1h' }      // Token expires in 1 hour
    );

    res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
