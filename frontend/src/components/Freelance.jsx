import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Instagram, Dice5, Music, CircleDot, QrCode } from 'lucide-react';
import { freelanceData } from '../data/mock';

const iconMap = {
  Dice5: Dice5,
  Music: Music,
  CircleDot: CircleDot,
  QrCode: QrCode
};

const Freelance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 lg:py-32" style={{ background: '#0F1525' }}>
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
            {freelanceData.heading}
          </h2>
          <p className="text-[#4A5270] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {freelanceData.sub}
          </p>
        </motion.div>

        {/* Featured Qpid card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-[#1E2845] bg-[#161D35]/60 backdrop-blur-sm p-6 lg:p-8 mb-16 hover:border-[#7B5EEA]/20 transition-all duration-300"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#7B5EEA] via-[#3B6FD4] to-transparent" />

          <h3
            className="text-xl lg:text-2xl font-bold text-[#F0F4FF] mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {freelanceData.featured.title}
          </h3>

          <div className="space-y-3 mb-5">
            {freelanceData.featured.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-[#8B93B0] text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {freelanceData.featured.stats.map(stat => (
              <span
                key={stat}
                className="px-3 py-1.5 rounded-lg text-xs bg-[#0F1525] border border-[#1E2845] text-[#8B93B0]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {stat}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {freelanceData.featured.tech.map((t, i) => (
              <span key={t} className="text-xs text-[#4A5270]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {t}{i < freelanceData.featured.tech.length - 1 ? ' \u00b7' : ''}
              </span>
            ))}
          </div>

          <a
            href={freelanceData.featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E2845] text-[#8B93B0] text-sm hover:text-[#F0F4FF] hover:border-[#7B5EEA]/40 transition-all duration-200"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Instagram className="w-4 h-4" />
            Instagram Page
          </a>
        </motion.div>

        {/* Frontend Experiments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3
            className="text-xl font-bold text-[#F0F4FF] mb-2 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Frontend Experiments
          </h3>
          <p className="text-[#4A5270] text-sm text-center mb-8" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Small builds. Real practice.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {freelanceData.experiments.map((exp, i) => {
              const IconComp = iconMap[exp.icon] || CircleDot;
              return (
                <motion.a
                  key={exp.title}
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-[#1E2845] bg-[#161D35]/40 hover:border-[#7B5EEA]/30 hover:bg-[#7B5EEA]/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <IconComp className="w-6 h-6 text-[#7B5EEA] group-hover:text-[#A78BFA] transition-colors" />
                  <span className="text-sm text-[#F0F4FF] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {exp.title}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#4A5270] group-hover:text-[#8B93B0] transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    {exp.link.includes('github.com') ? 'GitHub' : 'Play Live'}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Freelance;