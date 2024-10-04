import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/transactions";

export const fetchTransactions = async (page, pageSize) => {
  const response = await axios.get(
    `${API_URL}?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const fetchTransactionById = async (transactionId) => {
  const response = await axios.get(`${API_URL}/${transactionId}`);
  return response.data;
};

export const createTransaction = async (transaction) => {
  const response = await axios.post(`${API_URL}`, transaction);
  return response.data;
};

export const updateTransaction = async (transactionId, transaction) => {
  const response = await axios.put(`${API_URL}/${transactionId}`, transaction);
  return response.data;
};

export const deleteTransaction = async (transactionId) => {
  const response = await axios.delete(`${API_URL}/${transactionId}`);
  return response.data;
};
