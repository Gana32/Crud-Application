// models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: { type: String },
  location: { type: String },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
