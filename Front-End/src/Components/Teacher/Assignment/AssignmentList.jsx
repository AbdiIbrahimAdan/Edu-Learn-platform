import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teacher/assignments');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>
            <h3>{assignment.title}</h3>
            <p>{assignment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
