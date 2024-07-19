// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${API_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
