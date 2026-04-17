import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Labs from './components/Labs';
import Freelance from './components/Freelance';
import DSA from './components/DSA';
import Timeline from './components/Timeline';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import {
  personalInfo,
  aboutContent,
  skillsData,
  projectsData,
  labsData,
  freelanceData,
  dsaData,
  timelineData,
  hobbiesData,
  contactData,
  navLinks,
} from './data/mock';

const Portfolio = () => (
  <div className="min-h-screen" style={{ background: '#080C18', cursor: 'none' }}>
    <CustomCursor />
    <Navbar navLinks={navLinks} personalInfo={personalInfo} />
    <Hero personalInfo={personalInfo} />
    <About aboutContent={aboutContent} />
    <Skills skillsData={skillsData} />
    <Projects projectsData={projectsData} />
    <Labs labsData={labsData} />
    <Freelance freelanceData={freelanceData} />
    <DSA dsaData={dsaData} />
    <Timeline timelineData={timelineData} />
    <Hobbies hobbiesData={hobbiesData} />
    <Contact contactData={contactData} />
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
