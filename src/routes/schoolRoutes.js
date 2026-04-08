const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');

const { addSchool, listSchools } = require('../controllers/schoolController');
const { handleValidationErrors } = require('../middleware/validate');

// POST /addSchool
router.post(
  '/addSchool',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('name is required')
      .isLength({ min: 2, max: 255 }).withMessage('name must be 2–255 characters'),

    body('address')
      .trim()
      .notEmpty().withMessage('address is required')
      .isLength({ min: 5, max: 500 }).withMessage('address must be 5–500 characters'),

    body('latitude')
      .notEmpty().withMessage('latitude is required')
      .isFloat({ min: -90, max: 90 }).withMessage('latitude must be a number between -90 and 90'),

    body('longitude')
      .notEmpty().withMessage('longitude is required')
      .isFloat({ min: -180, max: 180 }).withMessage('longitude must be a number between -180 and 180'),
  ],
  handleValidationErrors,
  addSchool
);

// GET /listSchools?latitude=xx&longitude=xx
router.get(
  '/listSchools',
  [
    query('latitude')
      .notEmpty().withMessage('latitude query param is required')
      .isFloat({ min: -90, max: 90 }).withMessage('latitude must be a number between -90 and 90'),

    query('longitude')
      .notEmpty().withMessage('longitude query param is required')
      .isFloat({ min: -180, max: 180 }).withMessage('longitude must be a number between -180 and 180'),
  ],
  handleValidationErrors,
  listSchools
);

module.exports = router;