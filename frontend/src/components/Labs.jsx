import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Award, Terminal } from 'lucide-react';
// Props: labsData passed from parent

const LabEntry = ({ entry, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-[#7B5EEA]/40 to-[#1E2845]" />
      {/* Node */}
      <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3px] rounded-full bg-[#7B5EEA] shadow-[0_0_10px_rgba(123,94,234,0.4)]" />

      <div className="rounded-xl border border-[#1E2845] bg-[#161D35]/60 backdrop-blur-sm p-6 hover:border-[#7B5EEA]/20 transition-all duration-300">
        <h3
          className="text-lg font-bold text-[#F0F4FF] mb-3"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {entry.title}
        </h3>

        <div className="space-y-2 mb-4">
          {entry.description.split('\n').map((line, i) => (
            <p
              key={i}
              className="text-[#8B93B0] text-sm leading-relaxed"
              style={{ fontFamily: line.startsWith('Covered:') || line.startsWith('Technique:') ? 'JetBrains Mono, monospace' : 'Inter, sans-serif' }}
            >
              {line}
            </p>
          ))}
        </div>

        {entry.tools && (
          <p className="text-xs text-[#4A5270] mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Tools: {entry.tools}
          </p>
        )}

        {entry.note && (
          <p className="text-xs text-[#4A5270] italic mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            {entry.note}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {entry.badges && entry.badges.map(badge => (
            <span
              key={badge}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs bg-[#7B5EEA]/10 text-[#A78BFA] border border-[#7B5EEA]/15"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              <Award className="w-3 h-3" />
              {badge}
            </span>
          ))}
          {entry.link && (
            <a
              href={entry.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border border-[#1E2845] text-[#8B93B0] hover:text-[#A78BFA] hover:border-[#7B5EEA]/30 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <ExternalLink className="w-3 h-3" />
              {entry.link.label}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Labs = ({ labsData = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="labs" className="py-24 lg:py-32" style={{ background: '#080C18' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B5EEA]/30 to-transparent mb-16" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-[#7B5EEA]" />
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#F0F4FF]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {labsData.heading}
            </h2>
          </div>
          <p className="text-[#4A5270] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {labsData.sub}
          </p>
        </motion.div>

        <div className="space-y-0">
          {labsData.entries.map((entry, i) => (
            <LabEntry key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Labs;