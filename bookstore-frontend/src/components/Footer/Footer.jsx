import React from "react";
import { useDarkMode } from "../../DarkModeContext";
import './Footer.css'

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <footer className={`footer ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="footer">
          <a href="/about" className="navbar-link">
            About Us
          </a>
          <a href="/contact" className="navbar-link">
            Contact
          </a>
          <a href="/jobs" className="navbar-link">
            Jobs
          </a>
          <a href="/presskit" className="navbar-link">
            Press Kit
          </a>
        </div>
        <div className="footer">
          <a href="mailto:deadkiller0422@gmail.com">
            <i className="bi bi-envelope-at-fill"></i>
          </a>
          <a href="https://github.com/VIKASADODARIYA" target="_blank" rel="noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/vikas-adodariya-22b719242" target="_blank" rel="noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/v_i_k_a_s_patel.03" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        <p>
          Copyright &copy; 2024 - All rights reserved by bookStore.com
        </p>
      </footer>
    </>
  );
}
