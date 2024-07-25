import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';
import './Header.css';

const TeacherNav = () => {
  const [click, setClick] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav className='main'>
        <ul className={click ? "mobile-nav" : "main"} onClick={() => setClick(false)}>
          <li><Link to='/'>Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/teacher/dashboard'>Dashboard</Link></li>
              <li><Link to='/teacher/courses'>My Courses</Link></li>
              <li><Link to='/teacher/assignments'>My Assignments</Link></li>
              <li><Link to='/teacher/quizzes'>My Quizzes</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
              <li>
                <div className="user-info">
                  <FaUserCircle />
                  <span>{user?.firstName}</span>
                </div>
              </li>
            </>
          ) : (
            <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </>
          )}
        </ul>
        <button className='toggle' onClick={() => setClick(!click)}>
          {click ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </header>
  );
};

export default TeacherNav;
