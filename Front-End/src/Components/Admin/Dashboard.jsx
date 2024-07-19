
import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import UserManagement from './UserManagement/UserManagement';
import CourseManagement from './CourseManagement';
import AssignmentManagement from './AssignmentManagement/AssignmentManagement';
import QuizManagement from './QuizManagement/QuizManagement.jsx';

const Dashboard = () => {
  let { path, url } = useRouteMatch();

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

      <Switch>
        <Route exact path={path}>
          <DashboardHome />
        </Route>
        <Route path={`${path}/users`} component={UserManagement} />
        <Route path={`${path}/courses`} component={CourseManagement} />
        <Route path={`${path}/assignments`} component={AssignmentManagement} />
        <Route path={`${path}/quizzes`} component={QuizManagement} />
      </Switch>
    </div>
  );
};

const DashboardHome = () => (
  <div>
    <h2>Welcome to the Admin Dashboard</h2>
    
  </div>
);

export default Dashboard;
