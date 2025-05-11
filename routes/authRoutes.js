const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { forwardAuthenticated } = require('../middleware/auth');

router.get('/signup', forwardAuthenticated, authController.getSignup);
router.post('/signup', forwardAuthenticated, authController.postSignup);
router.get('/login', forwardAuthenticated, authController.getLogin);
router.post('/login', forwardAuthenticated, authController.postLogin);
router.get('/logout', authController.logout);

router.get('/login', (req, res) => {
  res.send('Login Page');
});

router.get('/signup', (req, res) => {
  res.send('Signup Page');
}); 


// authRoutes.js
router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error('Logout Error:', err);
      return res.status(500).send('Error during logout');
    }
    res.redirect('/login'); // Redirects to the login page after successful logout
  });
});


module.exports = router;
