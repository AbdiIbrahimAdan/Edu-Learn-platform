import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaBars, FaTimes} from 'react-icons/fa';
import './Header.css';
const Header = () => {
  const [click, setClick] = useState(false);
  return (
    <>
      <header>
        <nav className='main'>
            <ul className={click ? "mobile-nav" : "main"} onClick={() => setClick(false)}>
                <li><Link to= '/'>Home</Link></li>
                <li><Link to= '/about'>About</Link></li>
                <li><Link to= '/courses'>Courses</Link></li>
                <li><Link to= '/assignment'>Assignment</Link></li>
                <li><Link to= '/quizzes'>Quizzes</Link></li>
                

            </ul>
            <button className='toggle' onClick={() => setClick(!click)}>
                {click ? <FaTimes/> : <FaBars/>}


            </button>
        </nav>
      </header>
    </>
  )
}

export default Header
