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
  const [authUser, setAuthUser] = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".search-icon") && isSearchOpen) {
      setIsSearchOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement your search logic here
    console.log("Search query:", searchQuery);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50; // Adjust as needed
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSearchOpen, scrolled]);

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}  ${scrolled ? 'scrolled' : ''}`}>
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
        <a href="/">
          <img src={Logo} alt="The BookShelf" />
        </a>
      </div>
      {isMobile && (
        <>
          <div className="icon-btn" onClick={toggleDarkMode}>
            <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon"}`}></i>
          </div>
          {authUser ? (
            <Logout />
          ) : (
            <div className="login-btn" onClick={handleOpenModal}>
              <a href="#">Login</a>
            </div>
          )}
        </>
      )}
      <div className={`navbar-links ${isDropdownOpen && "open"} ${isDarkMode ? "dark-mode" : ""}`}>
        <a href="/" className="navbar-link">
          Home
        </a>
        <a href="/course" className="navbar-link">
          Course
        </a>
        <a href="/contact" className="navbar-link">
          Contact
        </a>
        <a href="/about" className="navbar-link">
          About
        </a>
        {authUser && authUser.role === 'admin' && (
          <a href="/users" className="navbar-link">
            Users
          </a>
        )}
        {!isMobile && (
          <>
            {/* <div className="search-label">
              <form action="">
                <input
                  type="search"
                  className="search-box"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
              <i className="bi bi-search" onClick={handleSearchSubmit}></i>
            </div> */}
            <div className="icon-btn" onClick={toggleDarkMode}>
              <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon-stars"}`}></i>
            </div>
            {authUser ? (
              <>
                <Logout />
                <div className="profile-img">
                  <Link to='/profile'><img src={authUser.profile || Profile} alt="Profile" /></Link>
                </div>
              </>
            ) : (
              <div className="login-btn" onClick={handleOpenModal}>
                <a href="#">Login</a>
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
