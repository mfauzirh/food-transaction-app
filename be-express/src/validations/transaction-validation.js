const { body, param } = require('express-validator');

const createTransactionValidation = [
  body('customerId').isInt().withMessage('Customer ID must be an integer'),
  body('foodId').isInt().withMessage('Food ID must be an integer'),
  body('qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const updateTransactionValidation = [
  param('id').isInt().withMessage('Transaction ID must be an integer'),
  body('qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

module.exports = {
  createTransactionValidation,
  updateTransactionValidation,
};