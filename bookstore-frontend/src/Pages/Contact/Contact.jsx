import React from "react";
import { useDarkMode } from "../../DarkModeContext";
import Footer from "../../components/Footer/Footer";
import "./Contact.css";

const Contact = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`main ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="contact-content">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="write your message here"
              required
            ></textarea>
          </div>
          <div className="submit-btn">
            <a href="/">Submit</a>
          </div>
        </form>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default Contact;
