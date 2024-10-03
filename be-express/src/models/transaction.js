const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "transaction_id",
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "customer_id",
      },
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "food_id",
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "qty",
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "total_price",
      },
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "transaction_date",
      },
    },
    {
      tableName: "transactions",
      timestamps: false,
    }
  );
};
