import React, { useState } from "react";
import { useDarkMode } from "../../DarkModeContext";
import toast from "react-hot-toast";
import "./ForgotPassword.css";

const ForgotPassword = ({ onCloseModal }) => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        console.log("Password changed successfully");
        toast.success("Password changed successfully");
        onCloseModal();
      } else {
        toast.error(data.message || "Invalid current password or new password format");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const closeForgotPasswordModal = () => {
    onCloseModal();
  };

  return (
    <dialog id="ForgotPasswordModel" className="modal">
      <div className={`forgot-password-main ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="forgot-password-content">
          <p>Change Password</p>
          <form onSubmit={handleForgotPassword}>
            <div className="form-details">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-details">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-details">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-pass-btn">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={closeForgotPasswordModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ForgotPassword;
