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