const Classroom = require('../models/Classroom');
const Principal = require('../models/Principal');
exports.createClassroom = async (req, res) => {
  const {
    name,
    daysInSession,
    teacherId // Make sure teacherId is extracted here
  } = req.body;

  const principalId = req.user.id; // Assuming the principal is authenticated

  try {
    // Validate that teacherId is provided
    if (!teacherId) {
      return res.status(400).json({ message: 'Teacher ID is required' });
    }

    // Create a new classroom
    const classroom = new Classroom({
      name,
      principal: principalId,
      teacher: teacherId, // Pass the teacherId here
      daysInSession
    });

    await classroom.save();

    // Add this classroom to the principal's classrooms
    const principal = await Principal.findById(principalId);
    principal.classrooms.push(classroom._id);
    await principal.save();

    res.status(201).json({ message: 'Classroom created successfully', classroom });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('principal', 'name email');
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


exports.getClassroomById = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Classroom.findById(id).populate('principal', 'name email');
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


exports.updateClassroom = async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  const { name, daysInSession, teacherId } = req.body;

  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    // Update the classroom fields
    if (name) classroom.name = name;
    if (teacherId) classroom.teacher = teacherId;
    if (daysInSession) classroom.daysInSession = daysInSession;

    await classroom.save();

    res.status(200).json({ message: 'Classroom updated successfully', classroom });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.deleteClassroom = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Classroom.findByIdAndDelete(id);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    // Remove the classroom reference from the Principal's classrooms array
    const principal = await Principal.findById(classroom.principal);
    if (principal) {
      principal.classrooms = principal.classrooms.filter(cId => cId.toString() !== id);
      await principal.save();
    }

    res.status(200).json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
