import React, { useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Github, Linkedin, Instagram, Mail, ArrowDown, Download, Eye } from 'lucide-react';
// Props: personalInfo passed from parent

const Hero = ({ personalInfo = {} }) => {
  const [engineReady, setEngineReady] = React.useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particlesOptions = useMemo(() => ({
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      color: { value: '#3B6FD4' },
      links: { enable: false },
      move: { enable: true, speed: 0.3, direction: 'none', outModes: { default: 'out' } },
      number: { value: 60, density: { enable: true, area: 1200 } },
      opacity: { value: { min: 0.1, max: 0.4 } },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 2.5 } }
    },
    detectRetina: true
  }), []);

  const particlesLoaded = useCallback(() => {}, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#080C18' }}>
      {engineReady && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-0"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
        />
      )}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B5EEA]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3B6FD4]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7B5EEA]/30 bg-[#7B5EEA]/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#7B5EEA] animate-pulse" />
              <span className="text-sm text-[#A78BFA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {personalInfo.badge}
              </span>
            </motion.div>

            <h1
              className="text-5xl lg:text-7xl font-bold text-[#F0F4FF] mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {personalInfo.name}
            </h1>

            <p
              className="text-lg lg:text-xl text-[#8B93B0] mb-4 leading-relaxed max-w-xl"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {personalInfo.tagline}
            </p>

            <p
              className="text-sm text-[#4A5270] mb-10 max-w-lg"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {personalInfo.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#7B5EEA] to-[#3B6FD4] text-white font-medium hover:shadow-[0_0_30px_rgba(123,94,234,0.3)] transition-all duration-300 hover:-translate-y-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Eye className="w-4 h-4" />
                View My Work
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#1E2845] text-[#F0F4FF] font-medium hover:border-[#7B5EEA]/50 hover:bg-[#7B5EEA]/5 transition-all duration-300 hover:-translate-y-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: personalInfo.socials.github },
                { icon: Linkedin, href: personalInfo.socials.linkedin },
                { icon: Instagram, href: personalInfo.socials.instagram },
                { icon: Mail, href: personalInfo.socials.email }
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#1E2845] text-[#8B93B0] hover:text-[#A78BFA] hover:border-[#7B5EEA]/40 hover:bg-[#7B5EEA]/5 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#7B5EEA] to-[#3B6FD4] rounded-2xl blur-sm opacity-60" />
              <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-[#7B5EEA]/40">
                <img
                  src={personalInfo.photo}
                  alt="Mayank Arora"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[#7B5EEA]/10 rounded-full blur-xl" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161D35] border border-[#1E2845] text-sm"
            >
              <span className="text-[#7B5EEA]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {personalInfo.photoBadge}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowDown className="w-5 h-5 text-[#4A5270]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;