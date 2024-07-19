
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes, deleteQuiz } from '../../services/api'; 
const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizzesData = await getQuizzes(); 
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuiz(quizId); 
      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
      alert('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz');
    }
  };

  return (
    <div className="quiz-management">
      <h2>Quiz Management</h2>
      <Link to="/admin/quizzes/create">Create New Quiz</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.id}>
              <td>{quiz.id}</td>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>
                <button onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizManagement;
