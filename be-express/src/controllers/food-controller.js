const { Op } = require("sequelize");
const { Food } = require("../models");

const getAllFoods = async (req, res) => {
  const { page = 1, pageSize = 10, name } = req.query;
  const offset = (page - 1) * pageSize;
  try {
    const where = {};

    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    const { count, rows } = await Food.findAndCountAll({
      where,
      limit: parseInt(pageSize, 10),
      offset: parseInt(offset, 10),
    });
    res.json({
      total: count,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching foods", error });
  }
};

const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(400).json({ error: "Food not found" });
    }
    res.json({ data: food });
  } catch (error) {
    res.status(500).json({ error: "Error fetching foods", error });
  }
};

const createFood = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const newFood = await Food.create({
      name: name,
      price: price,
      stock: stock,
    });
    res.status(201).json({ data: newFood });
  } catch (error) {
    res.status(500).json({ error: "Error creating foods", error });
  }
};

const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(400).json({ error: "Food not found" });
    }
    food.name = name;
    food.price = price;
    food.stock = stock;
    await food.save();
    res.json({ data: food });
  } catch (error) {
    res.status(500).json({ error: "Error updating foods", error });
  }
};

const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findByPk(id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    await food.destroy();
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: "Error deleting foods", error });
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
