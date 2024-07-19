// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
