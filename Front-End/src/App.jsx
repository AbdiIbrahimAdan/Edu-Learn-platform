import './App.css';
import React, { useEffect } from 'react';
import Header from './Components/Header/Header';
import Home from './Page/Home/Home';
import Signup from './Page/Signup/Signup';
import Login from './Page/Login/Login';
import Dashboard from './Components/Admin/Dashboard';
import About from './Page/About/About';
import CourseList from './Page/Courses/CourseList';
import AssignmentList from './Page/Assignments/AssignmentList';
import QuizList from './Page/Quizzes/QuizList';
import useAuthStore from './store/authStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<ProtectedRoute />}>
           
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/courses' element={<CourseList />} />
            <Route path='/assignments' element={<AssignmentList />} />
            <Route path='/quizzes' element={<QuizList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
