// models/Student.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt=require("bcryptjs");

const StudentSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },  // Added roll number field
  cgpa: { type: Number, required: true, min: 0, max: 10 },  // Added CGPA field
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' }  // Reference to Classroom
});

 StudentSchema.pre("save", async function () {
    this.password= await bcrypt.hash(this.password, 12);
  });


module.exports = mongoose.model('Student', StudentSchema);
