import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, TrendingUp, RefreshCw } from 'lucide-react';
// Props: dsaData passed from parent

const DSA = ({ dsaData = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 lg:py-32" style={{ background: '#080C18' }}>
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
            {dsaData.heading}
          </h2>
          <p className="text-[#4A5270] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {dsaData.sub}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — LeetCode card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border border-[#1E2845] bg-[#161D35]/60 backdrop-blur-sm p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FFA116]/10 flex items-center justify-center">
                  <span className="text-[#FFA116] font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>LC</span>
                </div>
                <div>
                  <p className="text-[#F0F4FF] font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{dsaData.platform}</p>
                  <p className="text-[#4A5270] text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{dsaData.username}</p>
                </div>
              </div>
              <a
                href={dsaData.profileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border border-[#1E2845] text-[#8B93B0] hover:text-[#A78BFA] hover:border-[#7B5EEA]/30 transition-all duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <ExternalLink className="w-3 h-3" />
                Profile
              </a>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F1525] border border-[#1E2845]">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-[#F0F4FF]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {dsaData.status}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F1525] border border-[#1E2845]">
                <RefreshCw className="w-4 h-4 text-[#3B6FD4]" />
                <span className="text-xs text-[#8B93B0]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ongoing — Updated Regularly
                </span>
              </div>
            </div>

            {/* Topic pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {dsaData.topics.map(topic => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-md text-xs bg-[#7B5EEA]/8 text-[#A78BFA] border border-[#7B5EEA]/15"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Languages */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#4A5270]" style={{ fontFamily: 'Inter, sans-serif' }}>Languages:</span>
              {dsaData.languages.map(lang => (
                <span
                  key={lang}
                  className="text-xs text-[#8B93B0]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Context copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {dsaData.contextCopy.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-[#8B93B0] leading-relaxed mb-5 text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {para}
              </p>
            ))}

            <div className="inline-flex items-center gap-2 mt-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-emerald-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Ongoing
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DSA;