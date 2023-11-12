// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  rollNo: { type: String, required: true },
  dob: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
});

// Hash the password before saving to the database
// userSchema.pre('save', async function (next) {
//   const user = this;
//   const hash = await bcrypt.hash(user.password, 10);
//   user.password = hash;
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
