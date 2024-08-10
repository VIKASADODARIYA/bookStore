import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Login.css";
import { useDarkMode } from "../../DarkModeContext";

const Signup = ({ onCloseModal }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userInfo = {
      // profile: formData.get('profile'),
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    // Password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(userInfo.password)) {
      toast.error("Password must be at least 8 characters long, contain an uppercase letter, a special character, and a number.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.134.227:5002/user/signup", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data) {
        toast.success("Signup Successfully");
        onCloseModal(); // Close modal after successful signup
        navigate("/"); // Navigate to homepage or any desired page
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="modal">
      <div className={`main-modal ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="main-content">
          <p>Sign Up</p>
          <form onSubmit={onSubmit}>
            {/* <div className="form-details">
              <label htmlFor="profile">Profile Image:</label>
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
                required
              />
            </div> */}
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
            <div className="action-btn">
              <button type="submit" className="submit-btn">Sign Up</button>
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
