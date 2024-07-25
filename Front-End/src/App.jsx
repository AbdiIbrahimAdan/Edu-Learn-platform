
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
import TeacherDashboard from './Page/Teach/TeacherDashboard';
import AdminDashboard from './Page/Admin/AdminDashboard';
import Profile from './Page/Profile/Profile';
// import useStudentStore from './store/useStudentStore';
import Footer from './Components/Footer/Footer';

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // const { fetchStudent } = useAuthStore(state => ({
  //   fetchStudent: state.fetchStudent,
  // }));

  // useEffect(() => {
  //   fetchStudent();
  // }, [fetchStudent]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/assignments' element={<AssignmentList />} />
        <Route path='/quizzes' element={<QuizList />} />
        <Route path='/profile' element={<Profile />} />

        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/teacherdashboard' element={<TeacherDashboard />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
