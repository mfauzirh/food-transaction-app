const { Food } = require('../models');

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: "Error fetching foods", error });
  }
};

const getFoodById = async(req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(400).json({ error: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: "Error fetching foods", error });
  }
};

const createFood = async (req, res) => {
  const { foodName, foodPrice, foodStock } = req.body;
  try {
    const newFood = await Food.create({
      food_name: foodName,
      food_price: foodPrice,
      food_stock: foodStock
    });
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: "Error creating foods", error });
  }
};

const updateFood = async (req, res) => {
  const { id } = req.params;
  const { foodName, foodPrice, foodStock } = req.body;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(400).json({ error: "Food not found" });
    }
    food.food_name = foodName;
    food.food_price = foodPrice;
    food.food_stock = foodStock;
    await food.save();
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: "Error updating foods", error });
  }
};

const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    await food.destroy();
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: "Error deleting foods", error });
  }
}

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};