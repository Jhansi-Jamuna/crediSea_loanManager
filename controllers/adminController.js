const Application = require('../models/Application');
const User = require('../models/User');

exports.getAdminDashboard = (req, res) => {
  res.render('adminDashboard');
};

exports.viewAllApplications = async (req, res) => {
  try {
    const apps = await Application.find();
    res.render('verifierDashboard', { apps });
  } catch (err) {
    res.status(500).send('Error fetching applications');
  }
};

exports.viewAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
};
