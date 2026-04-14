import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Code2 } from 'lucide-react';
// Props: skillsData passed from parent

const SkillPill = ({ skill, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.03, duration: 0.3 }}
    className="inline-flex items-center px-4 py-2 rounded-lg border border-[#7B5EEA]/20 bg-[#7B5EEA]/5 text-[#A78BFA] text-sm hover:border-[#7B5EEA]/50 hover:bg-[#7B5EEA]/10 hover:shadow-[0_0_15px_rgba(123,94,234,0.15)] transition-all duration-200 cursor-default"
    style={{ fontFamily: 'JetBrains Mono, monospace' }}
  >
    {skill}
  </motion.span>
);

const Skills = ({ skillsData = {} }) => {
  const [activeTab, setActiveTab] = useState('security');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const tabs = [
    { id: 'security', label: 'Security Stack', icon: Shield },
    { id: 'dev', label: 'Dev Stack', icon: Code2 }
  ];

  return (
    <section id="skills" className="py-24 lg:py-32" style={{ background: '#080C18' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B5EEA]/30 to-transparent mb-16" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#F0F4FF] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {skillsData.heading}
          </h2>
          <p className="text-[#4A5270] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {skillsData.sub}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#7B5EEA] to-[#3B6FD4] text-white shadow-[0_0_20px_rgba(123,94,234,0.2)]'
                  : 'bg-[#161D35] border border-[#1E2845] text-[#8B93B0] hover:text-[#F0F4FF] hover:border-[#7B5EEA]/30'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {(activeTab === 'security' ? skillsData.security : skillsData.dev).map((skill, i) => (
            <SkillPill key={skill} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;