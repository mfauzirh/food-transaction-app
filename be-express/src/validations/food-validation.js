const { body } = require('express-validator');

const createFoodValidation = [
  body('name').notEmpty().withMessage('Food name is required'),
  body('price').isNumeric().withMessage('Food price must be a number'),
  body('stock').isInt({ min: 0 }).withMessage('Food stock must be a non-negative integer'),
];

const updateFoodValidation = [
  body('name').notEmpty().withMessage('Food name is required'),
  body('price').isNumeric().withMessage('Food price must be a number'),
  body('stock').isInt({ min: 0 }).withMessage('Food stock must be a non-negative integer'),
];

module.exports = {
  createFoodValidation,
  updateFoodValidation,
};