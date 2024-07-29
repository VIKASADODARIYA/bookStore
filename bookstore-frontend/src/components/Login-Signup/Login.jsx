import React, { useState } from "react";
import { useDarkMode } from "../../DarkModeContext";
import "./Login.css";
import Signup from "../Login-Signup/Signup";
import toast  from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Login = ({ onCloseModal }) => {
  const { isDarkMode } = useDarkMode();
  const [authUser, setAuthUser] = useAuth(); // Import the useAuth hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        console.log("Login successful");
        setAuthUser(data.user); // Update authUser state
        localStorage.setItem("Users", JSON.stringify(data.user)); // Save user data to localStorage
        onCloseModal();
        toast.success("Login successful");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const closeLoginModal = () => {
    onCloseModal(); // Close the modal upon cancellation
  };

  const openSignupModal = () => {
    setShowSignupModal(true); // Open Signup modal
  };

  const closeSignupModal = () => {
    setShowSignupModal(false); // Close Signup modal
  };

  return (
    <dialog id="LoginModel" className="modal">
      <div className={`login-main ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="login-content">
          <p>Login</p>
          <form onSubmit={handleLogin}>
            <div className="form-details">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-details">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <h4 className="error-message">{error}</h4>}
            <div className="login-cancle-btn">
              <button type="submit" className="login-btn">
                Login
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={closeLoginModal}
              >
                Cancel
              </button>
            </div>
            <div className="signup-btn">
              <h3>
                Don't have an account?{" "}
                <Link to="#" onClick={openSignupModal}>
                  Signup
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
      {showSignupModal && <Signup onCloseModal={closeSignupModal} />}
    </dialog>
  );
};

export default Login;
