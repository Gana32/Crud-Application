// models/User.js
const mongoose = require('mongoose');

const nonEmptyStringValidator = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, validate:nonEmptyStringValidator },
  lastname: { type: String, required: true, validate:nonEmptyStringValidator },
  email: { type: String, unique: true, required: true, validate:nonEmptyStringValidator },
  password: { type: String, required: true, validate:nonEmptyStringValidator },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
