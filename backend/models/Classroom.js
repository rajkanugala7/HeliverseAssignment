const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassroomSchema = new Schema({
  name: { type: String, required: true, unique: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // Array of student references
  principal: { type: Schema.Types.ObjectId, ref: 'Principal', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true, unique: true },
  daysInSession: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String },
  },
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
