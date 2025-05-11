const User = require('../models/User');

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
    req.flash('success_msg', 'You are now logged in');

    // Redirect based on user role
    switch (user.role) {
      case 'admin':
        return res.redirect('/admin/dashboard');
      case 'verifier':
        return res.redirect('/verifier/dashboard');
      case 'user':
        return res.redirect('/user/dashboard');
      default:
        return res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error logging in');
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
