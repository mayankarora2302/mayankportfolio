import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
// Props: navLinks, personalInfo passed from parent

const Navbar = ({ navLinks = [], personalInfo = {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080C18]/80 backdrop-blur-xl border-b border-[#1E2845]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Shield className="w-5 h-5 text-[#7B5EEA] group-hover:text-[#A78BFA] transition-colors" />
            <span className="font-bold text-[#F0F4FF] text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              MA
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-[#A78BFA] bg-[#7B5EEA]/10'
                    : 'text-[#8B93B0] hover:text-[#F0F4FF] hover:bg-[#1E2845]/30'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#7B5EEA] to-[#3B6FD4] text-white hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Resume
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#8B93B0] hover:text-[#F0F4FF] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F1525]/95 backdrop-blur-xl border-b border-[#1E2845]/50"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block px-4 py-3 rounded-lg text-[#8B93B0] hover:text-[#F0F4FF] hover:bg-[#1E2845]/30 transition-all text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-[#7B5EEA] to-[#3B6FD4] text-white text-center mt-2"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;