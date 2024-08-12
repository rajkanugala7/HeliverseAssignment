// models/Classroom.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassroomSchema = new Schema({
  name: { type: String, required: true ,unique:true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }], // Array of student references
  principal: { type: Schema.Types.ObjectId, ref: 'Principal', required: true } // Reference to Principal
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
