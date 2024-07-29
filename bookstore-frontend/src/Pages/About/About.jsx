import React from "react";
import { useDarkMode } from "../../DarkModeContext";
import Footer from "../../components/Footer/Footer";
import "./About.css";

const About = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`main ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="about-content">
        <h2>About Our <span>BookStore</span></h2>
        <p>
          Welcome to our bookstore app! We are passionate about books and aim to
          provide a wide selection of titles across genres for all book lovers.
        </p>
        <p>
          Our bookstore app is designed to make browsing, discovering, and
          purchasing books a delightful experience. Whether you're looking for
          bestsellers, classics, or niche titles, we've curated a collection
          that we hope you'll enjoy.
        </p>
        <p>
          Thank you for choosing to explore our bookstore. We value your
          feedback and suggestions as we continue to improve and expand our
          offerings.
        </p>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default About;
