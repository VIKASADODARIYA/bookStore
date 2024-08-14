import React from "react";
import { useDarkMode } from "../../DarkModeContext";
import Footer from "../../components/Footer/Footer";
import "./About.css";

const About = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`main ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="about-header">
        <h2>About <span>BookShelf</span></h2>
      </div>
      <div className="about-content">
        <section className="mission-vision">
          <h3>Our Mission</h3>
          <p>
            At <strong>BookShelf</strong>, we are passionate about education and believe
            that the right resources can make all the difference in a learner's journey.
            Our mission is to provide students, educators, and lifelong learners with
            access to the best educational materials, helping them achieve their academic
            and personal goals.
          </p>
          <h3>Our Vision</h3>
          <p>
            To be the leading provider of educational resources, fostering a global community
            of learners and educators who are empowered and inspired by our materials.
          </p>
        </section>
        <section className="features">
          <h3>What We Offer</h3>
          <ul>
            <li>Extensive collection of textbooks, reference books, guides, and supplementary materials.</li>
            <li>Affordable prices and high-quality resources to support your educational journey.</li>
            <li>Regular updates with the latest and most relevant educational materials.</li>
          </ul>
        </section>
        <section className="testimonials">
          <h3>What Our Users Say</h3>
          <div className="testimonial">
            <p>"<strong>BookShelf</strong> has been an invaluable resource for my studies. The selection and quality of books are fantastic!"</p>
            <span>- Jane Doe, Student</span>
          </div>
          <div className="testimonial">
            <p>"As a teacher, I rely on <strong>BookShelf</strong> for the latest teaching materials. It’s been a game changer for my curriculum!"</p>
            <span>- John Smith, Educator</span>
          </div>
        </section>
        <section className="contact">
          <h3>Contact Us</h3>
          <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@bookshelf.com">support@bookshelf.com</a>.</p>
        </section>
        <div className="developer-card">
          <img src="https://avatars.githubusercontent.com/u/106027283?v=4" alt="Vikas Adodariya" className="developer-image" />
          <div className="developer-info">
            <h3>Vikas Adodariya</h3>
            <p>
              Vikas Adodariya is a passionate software developer with a strong background in web development technologies including JavaScript, Node.js, and React.
              Currently, Vikas is diving deeper into Next.js and TypeScript to build more scalable and efficient applications.
              With a keen eye for detail and a commitment to quality, Vikas is dedicated to creating innovative solutions that meet the needs of users and businesses alike.
            </p>
            <p>
              <strong>Skills:</strong> JavaScript, Node.js, React, MongoDB, Next.js, TypeScript
            </p>
            <p>
              <strong>Achievements:</strong> Contributed to various successful projects including educational platforms, e-commerce sites, and enterprise applications.
            </p>
            <p>
              <strong>Connect with Me:</strong> <a href="https://www.linkedin.com/in/vikasadodariya" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/vikasadodariya" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default About;
