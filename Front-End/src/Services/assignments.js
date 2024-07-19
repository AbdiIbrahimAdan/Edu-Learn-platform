// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

export const getAssignments = async () => {
  try {
    const response = await axios.get(`${API_URL}/assignments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAssignment = async (assignmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/assignments/${assignmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
