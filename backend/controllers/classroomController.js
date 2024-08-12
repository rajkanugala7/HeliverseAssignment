const Classroom = require('../models/Classroom');
const Principal = require('../models/Principal');

exports.createClassroom = async (req, res) => {
  const { name } = req.body;
  const principalId = req.user.id; // Assuming the principal is authenticated

  try {
    // Create a new classroom
    const classroom = new Classroom({
      name,
      principal: principalId
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
