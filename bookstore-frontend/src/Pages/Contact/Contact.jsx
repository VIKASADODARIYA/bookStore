import React, { useState } from "react";
import { useDarkMode } from "../../DarkModeContext";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import "./Contact.css";

const Contact = () => {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/user/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.status === 201) {
        toast.success("Message saved successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to save the message.");
      }
    } catch (error) {
      toast.error("Internal server error.");
      console.error("Error:", error.message);
    }
  };

  return (
    <div className={`main ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="contact-content">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="submit-btn" onClick={handleSubmit}>
            {/* <button type="submit">Submit</button> */}
            <a href="#">Submit</a>
          </div>
        </form>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default Contact;
