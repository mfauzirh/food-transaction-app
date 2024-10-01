const { body } = require('express-validator');

const createFoodValidation = [
  body('foodName').notEmpty().withMessage('Food name is required'),
  body('foodPrice').isNumeric().withMessage('Food price must be a number'),
  body('foodStock').isInt({ min: 0 }).withMessage('Food stock must be a non-negative integer'),
];

const updateFoodValidation = [
  body('foodName').notEmpty().withMessage('Food name is required'),
  body('foodPrice').isNumeric().withMessage('Food price must be a number'),
  body('foodStock').isInt({ min: 0 }).withMessage('Food stock must be a non-negative integer'),
];

module.exports = {
  createFoodValidation,
  updateFoodValidation,
};