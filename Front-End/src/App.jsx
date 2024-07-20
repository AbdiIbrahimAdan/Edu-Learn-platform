import './App.css';
import React, { useEffect } from 'react';
import Header from './Components/Header/Header';
import Home from './Page/Home/Home';
import Signup from './Page/Signup/Signup';
import Login from './Page/Login/Login';
import About from './Page/About/About';
import CourseList from './Page/Courses/CourseList';
import AssignmentList from './Page/Assignments/AssignmentList';
import QuizList from './Page/Quizzes/QuizList';
import useAuthStore from './store/authStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './Components/Admin/UserManagement/UserManagement';
import CourseManagement from './Components/Admin/CourseManagement/CourseManagement';
import AssignmentManagement from './Components/Admin/AssignmentManagement/AssignmentManagement';
import QuizManagement from './Components/Admin/QuizManagement/QuizManagement';
import Dashboard from './Components/Admin/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRoute from './Components/AdminRoute'; 

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/about' element={<About />} />
          <Route path='/courses' element={<CourseList />} />
          <Route path='/assignments' element={<AssignmentList />} />
          <Route path='/quizzes' element={<QuizList />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<Dashboard />} />
            <Route path='/admin/users' element={<UserManagement />} />
            <Route path='/admin/courses' element={<CourseManagement />} />
            <Route path='/admin/assignments' element={<AssignmentManagement />} />
            <Route path='/admin/quizzes' element={<QuizManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
