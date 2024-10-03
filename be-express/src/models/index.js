const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const Customer = require('./customer')(sequelize);
const Food = require('./food')(sequelize);
const Transaction = require('./transaction')(sequelize);

Customer.hasMany(Transaction, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
Food.hasMany(Transaction, { foreignKey: 'food_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer', onDelete: 'CASCADE' });
Transaction.belongsTo(Food, { foreignKey: 'food_id', as: 'food', onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  Customer,
  Food,
  Transaction
};