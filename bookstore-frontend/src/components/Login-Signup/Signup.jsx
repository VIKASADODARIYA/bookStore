import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {toast} from "react-hot-toast";
import "./Login.css";
import { useDarkMode } from "../../DarkModeContext";

const Signup = ({ onCloseModal }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event); 
    const formData = new FormData(event.target);
    const userInfo = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    try {
      console.log("formData", formData);
      const response = await axios.post("http://localhost:5002/user/signup", userInfo);
      console.log("Response:", response); // Debugging

      if (response.data) {
        toast.success("Signup Successfully");
        onCloseModal(); // Close modal after successful signup
        navigate("/"); // Navigate to homepage or any desired page
      }
    } catch (error) {
      console.error("Error:", error); // Debugging

      if (error.response) {
        toast.error("Error: " + error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="modal">
      <div className={`login-main ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="login-content">
          <p>Sign Up</p>
          <form onSubmit={onSubmit}>
            <div className="form-details">
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-details">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-details">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
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
                required
              />
            </div>
            <div className="login-cancle-btn">
              <button type="submit" className="login-btn">Sign Up</button>
              <button type="button" className="cancel-btn" onClick={onCloseModal}>Cancel</button>
            </div>
            <div className="signup-btn">
              <h3>Already have an account? <Link to="#" onClick={onCloseModal}>Login</Link></h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
