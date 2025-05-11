// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

// router.get('/signup', forwardAuthenticated, userController.getSignup);
// router.post('/signup', userController.postSignup);
// router.get('/login', forwardAuthenticated, userController.getLogin);
// router.post('/login', userController.postLogin);
// router.get('/logout', userController.logout);
// router.get('/apply', ensureAuthenticated, userController.getApplyForm);
// router.post('/apply', ensureAuthenticated, userController.postApplication);
// // router.get('/dashboard', ensureAuthenticated, userController.getDashboard);
// // router.get('/apply', userController.getApplyForm);


// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


const { ensureAuthenticated } = require('../middleware/auth');

router.get('/apply', ensureAuthenticated, userController.getApplyForm);
router.post('/apply', ensureAuthenticated, userController.postApplication);
router.get('/dashboard', ensureAuthenticated, userController.getDashboard);

router.get('/dashboard', (req, res) => {
  res.send('User Dashboard');
});

router.get('/apply', (req, res) => {
  res.send('User Apply Page');
});


module.exports = router;
