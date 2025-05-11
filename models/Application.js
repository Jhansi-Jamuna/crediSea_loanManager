const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: String,
  loanAmount: Number,
  tenure: Number,
  employmentStatus: String,
  employmentAddress: String,
  loanReason: String,
  email: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
