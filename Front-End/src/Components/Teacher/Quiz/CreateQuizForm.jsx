import React, { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../../../store/authStore';

const CreateQuizForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const { user } = useAuthStore(state => state); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await axios.post('http://localhost:5000/api/teacher/quizzes', {
          title,
          description,
          courseId,
          teacherId: user.id 
        });
        alert('Quiz created successfully');
  
        setTitle('');
        setDescription('');
        setCourseId('');
      } else {
        alert('No user information available');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Quiz</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Course ID:
        <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} required />
      </label>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default CreateQuizForm;
