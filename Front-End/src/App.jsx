import './App.css'
import React, {useEffect} from 'react';
import Header from './Components/Header/Header';
import Home from './Page/Home/Home';
// import Signup from './Page/Signup/Signup';
import useAuthStore from './store/authStore';
import Login from './Page/Login/Login';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
function App() {
  const fetchUser =  useAuthStore((state) => state.fetchUser);
  useEffect(() => {
    fetchUser();

  }, [fetchUser]);

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <ProtectedRoute path='/' element={<Home/>}/>
      <ProtectedRoute path='/login' element={<Login/>}/>
      <ProtectedRoute path='/signup' element={<Signup/>}/>
      <ProtectedRoute path='/dashboard' element={<Dashboard/>}/>
      <ProtectedRoute path='/about' element={<About/>}/>
      
      <ProtectedRoute path='/courses' Component={CourseList}/>
      <ProtectedRoute path='/assignments' Component={AssignmentList}/>
      <ProtectedRoute path='/quizzes' Component={QuizList}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
