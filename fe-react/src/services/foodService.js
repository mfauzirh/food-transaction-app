import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/foods';

export const fetchFoods = async (page, pageSize) => {
  const response = await axios.get(`${API_URL}?page=${page}&pageSize=${pageSize}`)
  return response.data;
}

export const fetchFoodById = async (foodId) => {
  const response = await axios.get(`${API_URL}/${foodId}`);
  return response.data;
};

export const createFood = async (food) => {
  const response = await axios.post(`${API_URL}`, food);
  return response.data;
}

export const updateFood = async (foodId, food) => {
  const response = await axios.put(`${API_URL}/${foodId}`, food);
  return response.data;
}

export const deleteFood = async (foodId) => {
  const response = await axios.delete(`${API_URL}/${foodId}`);
  return response.data;
};