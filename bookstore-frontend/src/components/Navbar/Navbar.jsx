import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/Logo-1.png";
import Profile from "../../assets/profile.png";
import Login from "../Login-Signup/Login";
import Logout from "../Login-Signup/Logout";
import { useAuth } from '../../context/AuthProvider';
import { useDarkMode } from "../../DarkModeContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [authUser] = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleResize = () => setIsMobile(window.innerWidth < 768);
  const handleScroll = () => setScrolled(window.scrollY > 50);

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to close dropdown when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""} ${scrolled ? 'scrolled' : ''}`}>
      {isMobile && (
        <button
          className={`dropdown-toggle ${isDarkMode ? "dark-mode" : ""} ${isDropdownOpen ? "open" : ""}`}
          onClick={handleToggleDropdown}
        >
          <span className="dropdown-icon">
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
          </span>
        </button>
      )}
      <div className="navbar-brand">
        <Link to="/">
          <img src={Logo} alt="The BookShelf" />
        </Link>
      </div>
      {isMobile && (
        <>
          <div className="icon-btn" onClick={toggleDarkMode}>
            <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon"}`}></i>
          </div>
          {authUser ? (
            <>
              <Logout />
              <div className="profile-img">
                <Link to='/profile'>
                  <img src={authUser.profile || Profile} alt="Profile" />
                </Link>
              </div>
            </>
          ) : (
            <div className="login-btn" onClick={handleOpenModal}>
              <Link to="#" onClick={handleLinkClick}>Login</Link>
            </div>
          )}
        </>
      )}
      <div className={`navbar-links ${isDropdownOpen ? "open" : ""} ${isDarkMode ? "dark-mode" : ""}`}>
        <Link to="/" className="navbar-link" onClick={handleLinkClick}>Home</Link>
        <Link to="/books" className="navbar-link" onClick={handleLinkClick}>Books</Link>
        <Link to="/contact" className="navbar-link" onClick={handleLinkClick}>Contact</Link>
        <Link to="/about" className="navbar-link" onClick={handleLinkClick}>About</Link>
        {authUser && authUser.role === 'admin' && (
          <Link to="/users" className="navbar-link" onClick={handleLinkClick}>Users</Link>
        )}
        {!isMobile && (
          <>
            <div className="icon-btn" onClick={toggleDarkMode}>
              <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon-stars"}`}></i>
            </div>
            {authUser ? (
              <>
                <Logout />
                <div className="profile-img">
                  <Link to='/profile'>
                    <img src={authUser.profile || Profile} alt="Profile" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="login-btn" onClick={handleOpenModal}>
                <Link to="#" onClick={handleLinkClick}>Login</Link>
              </div>
            )}
          </>
        )}
      </div>
      {isModalOpen && <Login onCloseModal={handleCloseModal} />}
    </nav>
  );
};

export default Navbar;
