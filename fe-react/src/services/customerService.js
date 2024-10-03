import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/customers';

export const fetchCustomers = async (page, pageSize) => {
  const response = await axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`)
  return response.data;
}

export const fetchCustomerById = async (customerId) => {
  const response = await axios.get(`${API_URL}/${customerId}`);
  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await axios.post(`${API_URL}`, customer);
  return response.data;
}

export const updateCustomer = async (customerId, customer) => {
  const response = await axios.put(`${API_URL}/${customerId}`, customer);
  return response.data;
}

export const deleteCustomer = async (customerId) => {
  const response = await axios.delete(`${API_URL}/${customerId}`);
  return response.data;
};