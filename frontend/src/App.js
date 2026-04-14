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

const Portfolio = () => (
  <div className="min-h-screen" style={{ background: '#080C18', cursor: 'none' }}>
    <CustomCursor />
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Labs />
    <Freelance />
    <DSA />
    <Timeline />
    <Hobbies />
    <Contact />
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