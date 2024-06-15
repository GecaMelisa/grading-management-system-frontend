import React from 'react';
import './about.css'; 
import NavBar from '../NavBar/NavBar';

const About = () => {
  return (
    <div>
      <NavBar />   
      <div className="main-content">
        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">About Our Grading Management System</h1>
            <p className="about-description">
              Our grading management system is designed to streamline the grading process, ensuring accuracy and efficiency in educational institutions. With a user-friendly interface and robust features, our platform makes it easy for teachers to manage grades and for students to stay updated with their academic performance.
            </p>
            <p className="about-description">
              The system offers real-time updates, comprehensive reports, and an intuitive dashboard that simplifies grade management tasks. Our goal is to enhance the educational experience for both educators and students through technology.
            </p>
            <div className="administration-section">
            <p>For more details, please contact our Administration team.</p>
            <ul>
                <li>Melisa Geca</li>
                <li>Tarik Maljanović</li>
                <li>Kerim Šabić</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
