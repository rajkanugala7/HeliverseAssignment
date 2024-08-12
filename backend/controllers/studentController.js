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

exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.find().populate('classroom');
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };


  exports.getStudentById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const student = await Student.findById(id).populate('classroom');
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };

  
  exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { email, name, rollNo, cgpa, classroomId } = req.body;
  
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { email, name, rollNo, cgpa, classroom: classroomId },
        { new: true }
      ).populate('classroom');
  
      if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
  
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };

  exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
  
    try {
      const student = await Student.findByIdAndDelete(id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      // Optionally, remove the student from the Classroom's students list
      await Classroom.updateOne(
        { _id: student.classroom },
        { $pull: { students: student._id } }
      );
  
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };
  