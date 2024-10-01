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

Customer.hasMany(Transaction, { foreignKey: 'customer_id' });
Food.hasMany(Transaction, { foreignKey: 'food_id' });
Transaction.belongsTo(Customer, { foreignKey: 'customer_id' });
Transaction.belongsTo(Food, { foreignKey: 'food_id' });

module.exports = {
  sequelize,
  Customer,
  Food,
  Transaction
};