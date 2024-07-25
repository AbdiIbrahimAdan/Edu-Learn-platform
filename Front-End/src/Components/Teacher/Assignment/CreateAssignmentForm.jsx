import React, { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../../../store/authStore';
const CreateAssignmentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const { user } = useAuthStore(state => state); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await axios.post('http://localhost:5000/api/teacher/assignments', {
          title,
          description,
          courseId,
          teacherId: user.id 
        });
        alert('Assignment created successfully');
  
        setTitle('');
        setDescription('');
        setCourseId('');
      } else {
        alert('No user information available');
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Failed to create assignment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an Assignment</h2>
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
      <button type="submit">Create Assignment</button>
    </form>
  );
};

export default CreateAssignmentForm;
