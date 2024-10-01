const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Food', {
    food_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    food_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    food_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    food_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'foods',
    timestamps: false,
  });
};