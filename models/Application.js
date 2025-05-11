const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: String,
  loanAmount: Number,
  tenure: Number,
  employmentStatus: String,
  employmentAddress: String,
  loanReason: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);
