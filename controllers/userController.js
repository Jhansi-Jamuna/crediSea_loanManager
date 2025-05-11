const User = require('../models/User');
const Application = require('../models/Application');

exports.getSignup = (req, res) => {
  res.render('auth/signup');
};

exports.postSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = new User({ fullName, email, password, role: 'user' });
    await user.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (err) {
    req.flash('error_msg', 'Error registering user');
    res.redirect('/signup');
  }
};

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error_msg', 'No user found');
      return res.redirect('/login');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error_msg', 'Incorrect password');
      return res.redirect('/login');
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error_msg', 'Error logging in');
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};


exports.getApplyForm = (req, res) => {
  res.render('user/applyform');
};

exports.postApplication = async (req, res) => {
  const { fullName, loanAmount, tenure, employmentStatus, employmentAddress, loanReason } = req.body;
  const email = req.session.user.email;
  try {
    const application = new Application({
      fullName,
      loanAmount,
      tenure,
      employmentStatus,
      employmentAddress,
      loanReason,
      email
    });
    await application.save();
    req.flash('success_msg', 'Application submitted successfully');
    res.redirect('/user/dashboard');
  } catch (err) {
    req.flash('error_msg', 'Error submitting application');
    res.redirect('/user/apply');
  }
};

exports.getDashboard = async (req, res) => {
  const email = req.session.user.email;
  try {
    const applications = await Application.find({ email });
    res.render('user/dashboard', { applications });
  } catch (err) {
    req.flash('error_msg', 'Error fetching applications');
    res.redirect('/');
  }
};

