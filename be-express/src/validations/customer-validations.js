const { body, param } = require('express-validator');

const createCustomerValidation = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('phone').isString().notEmpty().withMessage('Phone is required'),
  body('address').isString().notEmpty().withMessage('Address is required'),
];

const updateCustomerValidation = [
  param('id').isInt().withMessage('Id must be an integer'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('phone').isString().notEmpty().withMessage('Phone is required'),
  body('address').isString().notEmpty().withMessage('Address is required'),
];