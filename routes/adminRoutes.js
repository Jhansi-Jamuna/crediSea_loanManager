const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/dashboard', ensureAuthenticated, adminController.getAdminDashboard);
router.get('/applications', ensureAuthenticated, adminController.viewAllApplications);
router.get('/users', ensureAuthenticated, adminController.viewAllUsers);

module.exports = router;
