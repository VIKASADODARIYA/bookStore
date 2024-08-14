import React from "react";
import { Link } from 'react-router-dom';
import { useDarkMode } from "../../DarkModeContext";
import './Footer.css';

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`footer ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Email: <a href="mailto:support@bookshelf.com">support@bookshelf.com</a></p>
          <p>Phone: +91-123-456-7890</p>
          <p>Address: 123 Book St, Book City, BK 12345-INDIA</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="quick-link">
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/jobs" className="footer-link">Jobs</Link>
            <Link to="/presskit" className="footer-link">Press Kit</Link>
          </div>
        </div>

        <div className="footer-section">
          <p>Connect with us on social media for the latest updates:</p>
          <div className="footer-socials">
            <Link to="https://github.com/VIKASADODARIYA" target="_blank" rel="noreferrer" className="social-link">
              <i className="bi bi-github"></i>
            </Link>
            <Link to="https://www.youtube.com/" target="_blank" rel="noreferrer" className="social-link">
              <i className="bi bi-youtube"></i>
            </Link>
            <Link to="https://www.linkedin.com/in/vikas-adodariya-22b719242" target="_blank" rel="noreferrer" className="social-link">
              <i className="bi bi-linkedin"></i>
            </Link>
            <Link to="https://www.instagram.com/v_i_k_a_s_patel.03" target="_blank" rel="noreferrer" className="social-link">
              <i className="bi bi-instagram"></i>
            </Link>
          </div>
          <p className="footer-copy">
            &copy; 2024 - All rights reserved by bookShelf.com
          </p>
        </div>
      </div>
    </footer>
  );
}
