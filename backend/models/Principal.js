// models/Principal.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt=require("bcryptjs");

const PrincipalSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  classrooms: [{ type: Schema.Types.ObjectId, ref: 'Classroom' }]  // References to created Classrooms
});

PrincipalSchema.pre("save", async function () {
    this.password= await bcrypt.hash(this.password, 12);
  });



module.exports = mongoose.model('Principal', PrincipalSchema);
