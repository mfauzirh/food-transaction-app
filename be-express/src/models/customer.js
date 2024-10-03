const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'customer_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'phone',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'address'
    },
  }, {
    tableName: 'customers',
    timestamps: false,
  });
};