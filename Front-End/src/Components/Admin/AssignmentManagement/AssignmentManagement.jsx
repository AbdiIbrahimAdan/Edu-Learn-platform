
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssignments, deleteAssignment } from '../../../Services/assignments.js'; 

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const assignmentsData = await getAssignments(); 
      setAssignments(assignmentsData);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await deleteAssignment(assignmentId); 
      setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
      alert('Assignment deleted successfully');
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Failed to delete assignment');
    }
  };

  return (
    <div className="assignment-management">
      <h2>Assignment Management</h2>
      <Link to="/admin/assignments/create">Create New Assignment</Link>
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
          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.id}</td>
              <td>{assignment.title}</td>
              <td>{assignment.description}</td>
              <td>
                <button onClick={() => handleDeleteAssignment(assignment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentManagement;
