const Student = require('../models/Student');
const Classroom = require('../models/Classroom');

exports.createStudent = async (req, res) => {
  const { email, password, name, rollNo, cgpa, classroomId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    const newStudent = new Student({ email, password, name, rollNo, cgpa, classroom: classroomId });
    await newStudent.save();

    classroom.students.push(newStudent._id);
    await classroom.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};