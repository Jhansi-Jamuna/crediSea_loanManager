const express = require('express');
const router = express.Router();
const verifierController = require('../controllers/verifierController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/dashboard', ensureAuthenticated, verifierController.getVerifierDashboard);
router.post('/approve/:id', ensureAuthenticated, verifierController.approveApplication);
router.post('/reject/:id', ensureAuthenticated, verifierController.rejectApplication);

module.exports = router;
