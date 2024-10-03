const express = require('express');
const { sequelize } = require('./models');
const customerRoutes = require('./routes/customer-routes');
const foodRoutes = require('./routes/food-routes');
const transactionRoutes = require('./routes/transaction-routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/foods', foodRoutes);
app.use('/api/v1/transactions', transactionRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();