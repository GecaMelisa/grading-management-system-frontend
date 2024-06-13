import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import './about.css'; 
import AboutHeader from '../components/About/AboutHeader';
import AboutContent from '../components/About/AboutContent';
import AboutMission from '../components/About/AboutMission';

const About = () => {
  console.log('About component is rendered');

  return (
    <div>
      <NavBar />

      <div className="about-container"> 
        <AboutHeader />
        <AboutContent />
        <AboutMission />
      </div>
    </div>
  );
};

export default About;
