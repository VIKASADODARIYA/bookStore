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
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send the message.");
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
        <p>
          We value your feedback and are here to assist you. Whether you have questions, comments, or need support, please use the form below to get in touch with us. We will get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
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
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default Contact;
