// models/Teacher.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt=require("bcryptjs");

const TeacherSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' }  // Reference to Classroom
});
TeacherSchema.pre("save", async function () {
    this.password= await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model('Teacher', TeacherSchema);
