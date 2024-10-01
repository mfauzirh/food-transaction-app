const express = require('express');
const {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} = require('../controllers/food-controller');
const {
  createFoodValidation,
  updateFoodValidation,
} = require('../validations/food-validation');
const validate = require('../middlewares/validation-middleware');

const router = express.Router();

router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.post('/', createFoodValidation, validate, createFood);
router.put('/:id', updateFoodValidation, validate, updateFood);
router.delete('/:id', deleteFood);

module.exports = router;