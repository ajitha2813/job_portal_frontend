import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Company</h3>
        <ul>
          <li>About Us</li>
          <li>Careers</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-section">
        <ul>
          <h3>Quick Links</h3>

          <li>Find Jobs</li>
          <li>Saved Jobs</li>
          <li>Post a Job</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Our Mobile App</h3>
        <p>Download our app for job search on the go:</p>
        <div className="app-buttons">
          <img src="/images/Google_Play_Store_badge_EN.svg.png" alt="Google Play Store" width="120px" height="40px"/>
          <img src="/images/appstore1.png" alt="App Store" width="140px" height="60px"/>
        </div>
      </div>
      <div className="footer-section">
        <h3>Connect with Us</h3>
        <ul className="social-icons">
          <li><FaFacebook className="social-icon" /></li> {/* Facebook Icon */}
          <li><FaTwitter className="social-icon" /></li>  {/* Twitter Icon */}
          <li><FaLinkedin className="social-icon" /></li> {/* LinkedIn Icon */}
        </ul>
      </div>
      
    </footer>
  );
};

export default Footer;
