const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');

// Create a new Teacher
exports.createTeacher = async (req, res) => {
  const { email, password, name, classroomId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    const newTeacher = new Teacher({ email, password, name, classroom: classroomId });
    await newTeacher.save();

    classroom.teachers.push(newTeacher._id); // Assuming classroom model has a 'teachers' array
    await classroom.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('classroom');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get Teacher by ID
exports.getTeacherById = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findById(id).populate('classroom');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a Teacher
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { email, name, classroomId } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { email, name, classroom: classroomId },
      { new: true }
    ).populate('classroom');

    if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a Teacher
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    // Optionally, remove the teacher from the Classroom's teachers list
    await Classroom.updateOne(
      { _id: teacher.classroom },
      { $pull: { teachers: teacher._id } }
    );

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
