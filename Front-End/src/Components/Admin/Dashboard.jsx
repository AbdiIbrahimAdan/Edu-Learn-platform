import React from 'react';
import { Link, Routes, Route, useMatch, useParams } from 'react-router-dom';
import UserManagement from './UserManagement/UserManagement.jsx';
import CourseManagement from './CourseManagement/CourseManagement.jsx';
import AssignmentManagement from './AssignmentManagement/AssignmentManagement.jsx';
import QuizManagement from './QuizManagement/QuizManagement.jsx';

const Dashboard = () => {
  const { path, url } = useMatch();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to={`${url}`}>Home</Link></li>
          <li><Link to={`${url}/users`}>Manage Users</Link></li>
          <li><Link to={`${url}/courses`}>Manage Courses</Link></li>
          <li><Link to={`${url}/assignments`}>Manage Assignments</Link></li>
          <li><Link to={`${url}/quizzes`}>Manage Quizzes</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/assignments" element={<AssignmentManagement />} />
        <Route path="/quizzes" element={<QuizManagement />} />
      </Routes>
    </div>
  );
};

const DashboardHome = () => (
  <div>
    <h2>Welcome to the Admin Dashboard</h2>
  </div>
);

export default Dashboard;
