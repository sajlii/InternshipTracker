const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const internshipController = require('../controllers/internshipController');
const authenticate = require('../middleware/authMiddleware');

// Apply authentication to all routes
router.use(authenticate);

// Validation rules
const internshipValidation = [
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('location').trim().notEmpty().withMessage('Location is required')
];

// Routes
router.post('/', internshipValidation, internshipController.createInternship);
router.get('/', internshipController.getAllInternships);
router.get('/statistics', internshipController.getStatistics);
router.get('/:id', internshipController.getInternship);
router.put('/:id', internshipController.updateInternship);
router.delete('/:id', internshipController.deleteInternship);

module.exports = router;