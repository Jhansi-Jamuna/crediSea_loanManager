const Application = require('../models/Application');

exports.getVerifierDashboard = async (req, res) => {
  try {
    const apps = await Application.find();
    res.render('verifierDashboard', { apps });
  } catch (err) {
    res.status(500).send('Error fetching applications');
  }
};

exports.approveApplication = async (req, res) => {
  try {
    await Application.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.redirect('/verifier/dashboard');
  } catch (err) {
    res.status(500).send('Error approving application');
  }
};

exports.rejectApplication = async (req, res) => {
  try {
    await Application.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.redirect('/verifier/dashboard');
  } catch (err) {
    res.status(500).send('Error rejecting application');
  }
};
