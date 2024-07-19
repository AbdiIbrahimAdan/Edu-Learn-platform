// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

export const getQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}/quizzes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    const response = await axios.delete(`${API_URL}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
