const { Customer } = require('../models');

const getAllCustomers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  try {
    const {count, rows} = await Customer.findAndCountAll({
      limit: parseInt(pageSize, 10),
      offset: parseInt(offset, 10),
    });
    res.json({
      total: count,
      data: rows
    });
  } catch (error) {
    res.status(500).json({error: 'Error fetching customers', error});
  }
}

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({error: "Customer not found"});
    }
    res.json({data: customer});
  } catch (error) {
    res.status(500).json({error: 'Error fetching customers', error});
  }
}

const createCustomer = async (req, res) => {
  const {name, phone, address} = req.body;
  try {
    const newCustomer = await Customer.create({name, phone, address});
    res.status(201).json({data: newCustomer});
  } catch (error) {
    res.status(500).json({error: 'Error creating customers', error});
    
  }
}

const updateCustomer = async (req, res) => {
  const {id} = req.params;
  const {name, phone, address} = req.body;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({error: 'Customer not found'});
    }
    customer.name = name;
    customer.phone = phone;
    customer.address = address;
    await customer.save();
    res.json({data: customer});
  } catch (error) {
    res.status(500).json({error: 'Error updating customers', error});
  }
}

const deleteCustomer = async (req, res) => {
  const {id} = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({error: 'Customer not found'});
    }
    await customer.destroy();
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({error: 'Error deleting customers', error});
    
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}