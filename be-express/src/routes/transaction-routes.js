const express = require('express');
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transaction-controller');
const validate = require('../middlewares/validation-middleware');
const {
  createTransactionValidation,
  updateTransactionValidation
} = require('../validations/transaction-validation');

const router = express.Router();

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/', createTransactionValidation, validate, createTransaction);
router.put('/:id', updateTransactionValidation, validate, updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;