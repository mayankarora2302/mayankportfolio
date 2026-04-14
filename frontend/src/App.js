import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
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

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#080C18' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-[#7B5EEA]/30 border-t-[#7B5EEA] rounded-full animate-spin" />
      <p className="text-[#4A5270] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        Loading portfolio...
      </p>
    </div>
  </div>
);

const PortfolioContent = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) return <LoadingScreen />;

  return (
    <div className="min-h-screen" style={{ background: '#080C18', cursor: 'none' }}>
      <CustomCursor />
      <Navbar navLinks={data.navLinks} personalInfo={data.personalInfo} />
      <Hero personalInfo={data.personalInfo} />
      <About aboutContent={data.aboutContent} />
      <Skills skillsData={data.skillsData} />
      <Projects projectsData={data.projectsData} />
      <Labs labsData={data.labsData} />
      <Freelance freelanceData={data.freelanceData} />
      <DSA dsaData={data.dsaData} />
      <Timeline timelineData={data.timelineData} />
      <Hobbies hobbiesData={data.hobbiesData} />
      <Contact contactData={data.contactData} />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PortfolioProvider>
          <Routes>
            <Route path="/" element={<PortfolioContent />} />
          </Routes>
        </PortfolioProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
