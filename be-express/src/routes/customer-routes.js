const express = require('express');
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customer-controller');
const {
  createCustomerValidation,
  updateCustomerValidation,
} = require('../validations/customer-validation');
const validate = require('../middlewares/validation-middleware');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomerValidation, validate, createCustomer);
router.put('/:id', updateCustomerValidation, validate, updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;