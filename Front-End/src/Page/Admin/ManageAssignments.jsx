import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/assignments', { withCredentials: true });
        setAssignments(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/assignments/${id}`, { withCredentials: true });
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Manage Assignments</h1>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>
            {assignment.title}
            <button onClick={() => handleDelete(assignment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAssignments;
