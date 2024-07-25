import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';
const Footer = () => {
  return (
<footer className='footer'>
      <div className='footer-container'>
        <div className='social-icons'>
          <a href="https://facebook.com" className='icons'><FaFacebook/></a>
          <a href="https://twitter.com" className='icons'><FaTwitter/></a>
          <a href="https://instagram.com" className='icons'>< FaInstagram/></a>
          <a href="https://linkedin.com" className='icons'>< FaLinkedin /></a>
      </div>
<hr  className='footer-divider'/>
    <div className='footer-copyright'>
        <p>&copy; 2024 Abdishu. All rights reserved.</p>
    </div>
    </div>
    </footer>
  
  )
}

export default Footer
