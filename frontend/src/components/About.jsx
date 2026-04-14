import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
// Props: aboutContent passed from parent

const TypingText = ({ text, delay = 0, speed = 30, onDone }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      return () => clearTimeout(t);
    } else if (onDone) {
      onDone();
    }
  }, [started, displayed, text, speed, onDone]);

  return <span>{displayed}</span>;
};

const TerminalCard = ({ aboutContent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentCmd, setCurrentCmd] = useState(0);
  const [showOutput, setShowOutput] = useState([]);
  const [typingDone, setTypingDone] = useState([]);

  const commands = aboutContent.terminal.commands;

  useEffect(() => {
    if (!isInView) return;
    if (currentCmd < commands.length && !typingDone.includes(currentCmd)) return;
    // advance handled via onDone
  }, [isInView, currentCmd, commands.length, typingDone]);

  const handleInputDone = (idx) => {
    setShowOutput(prev => [...prev, idx]);
    setTimeout(() => {
      setTypingDone(prev => [...prev, idx]);
      if (idx < commands.length - 1) {
        setTimeout(() => setCurrentCmd(idx + 1), 400);
      }
    }, 300);
  };

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-[#1E2845] bg-[#0a0f1e]/90 backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0F1525] border-b border-[#1E2845]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-xs text-[#4A5270]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {aboutContent.terminal.title}
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-4 min-h-[340px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {isInView && commands.map((cmd, idx) => (
          idx <= currentCmd && (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[#7B5EEA] text-xs">{'>'}</span>
                <span className="text-[#F0F4FF] text-xs">
                  {idx === currentCmd && !typingDone.includes(idx) ? (
                    <TypingText
                      text={cmd.input}
                      speed={50}
                      onDone={() => handleInputDone(idx)}
                    />
                  ) : (
                    cmd.input
                  )}
                </span>
              </div>
              {showOutput.includes(idx) && (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#8B93B0] text-xs whitespace-pre-wrap pl-4 leading-relaxed"
                >
                  {cmd.output}
                </motion.pre>
              )}
            </div>
          )
        ))}
        {isInView && (
          <div className="flex items-center gap-2">
            <span className="text-[#7B5EEA] text-xs">{'>'}</span>
            <span className="w-2 h-4 bg-[#7B5EEA] animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

const About = ({ aboutContent = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: '#0F1525' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Gradient divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B5EEA]/30 to-transparent mb-16" />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#F0F4FF] mb-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {aboutContent.heading}
            </h2>
            {aboutContent.body.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-[#8B93B0] leading-relaxed mb-5 text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TerminalCard aboutContent={aboutContent} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;