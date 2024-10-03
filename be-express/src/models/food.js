const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Food', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'food_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'food_name'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'food_price'
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'food_stock'
    },
  }, {
    tableName: 'foods',
    timestamps: false,
  });
};