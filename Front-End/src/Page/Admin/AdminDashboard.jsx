import React from 'react';
import ManageAssignments from './ManageAssignments';
import ManageUsers from './ManageUser/ManageUsers';
import ManageCourses from './ManageCourse/ManageCourses';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ManageUsers />
      <ManageCourses/>
      <ManageAssignments />
      
    </div>
  );
};

export default AdminDashboard;
