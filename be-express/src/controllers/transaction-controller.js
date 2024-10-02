const { Transaction, Food, Customer, sequelize } = require('../models');

const getAllTransactions = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  try {
    const { count, rows } = await Transaction.findAndCountAll({
      include: [
        { model: Food, attributes: ['food_name'] },
        { model: Customer, attributes: ['name'] },
      ],
      limit: parseInt(pageSize, 10),
      offset: parseInt(offset, 10),
    });

    res.json({
      total: count,
      data: rows
    })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions', error });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id, {
      include: [
        { model: Food, attributes: ['food_name', 'food_price', 'food_stock'] },
        { model: Customer, attributes: ['name', 'phone', 'address'] },
      ]
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({
      data: transaction
    })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions', error });
  }
};

const createTransaction = async (req, res) => {
  const {customerId, foodId, qty} = req.body;

  const dbTransaction = await sequelize.transaction();
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const food = await Food.findByPk(foodId);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    if (food.food_stock < qty) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    const totalPrice = food.food_price * qty;
    const newOrderTransaction = await Transaction.create(
      { 
        customer_id: customerId, 
        food_id: foodId,
        qty: qty, 
        totalPrice: totalPrice,
        total_price: totalPrice,
        transaction_date: new Date(),
      },
      { 
        dbTransaction 
      }
    );

    food.food_stock -= qty;
    await food.save({dbTransaction});

    await dbTransaction.commit();

    res.status(201).json({data: newOrderTransaction});
  } catch (error) {
    await dbTransaction.rollback();
    res.status(500).json({ error: 'Error creating transaction', error });
  }
}

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;

  const dbTransaction = await sequelize.transaction();
  try {
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Customer,
          as: 'Customer',
        },
        {
          model: Food,
          as: 'Food',
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const foodItem = await Food.findByPk(transaction.food_id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food not found' });
    }

    if (foodItem.food_stock < qty) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    const previousQty = transaction.qty; 
    foodItem.food_stock += previousQty - qty;

    await foodItem.save({dbTransaction});

    transaction.qty = qty;
    transaction.total_price = foodItem.food_price * qty;
    await transaction.save({dbTransaction});

    await dbTransaction.commit();

    res.json({data: transaction});
  } catch (error) {
    await dbTransaction.rollback();
    res.status(500).json({ error: 'Error updating transaction', error });
  }
}

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const dbTransaction = await sequelize.transaction();

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const foodItem = await Food.findByPk(transaction.food_id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food not found' });
    }

    foodItem.food_stock += transaction.qty;
    await foodItem.save({ dbTransaction });

    await transaction.destroy({dbTransaction });

    await dbTransaction.commit();

    res.status(204).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    await dbTransaction.rollback();
    res.status(500).json({ error: 'Error updating transaction', error });
  }
}


module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
}