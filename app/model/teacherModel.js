// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const validator = require('validator');

// const teacherSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   password: { type: String, required: true },
//   id: { type: String, required: true },
//   dob: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     validate: {
//       validator: validator.isEmail,
//       message: '{VALUE} is not a valid email',
//     },
//   },
//   mobileNumber: { type: String, required: true },
//   address: { type: String, required: true },
//   department: { type: String, required: true },
  
// });

// const teacher = mongoose.model('teacher', teacherSchema);

// module.exports = teacher;
