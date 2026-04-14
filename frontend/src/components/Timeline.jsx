import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, CheckCircle, Shield, GraduationCap } from 'lucide-react';
// Props: timelineData passed from parent

const iconMap = {
  Trophy,
  CheckCircle,
  Shield,
  GraduationCap
};

const Timeline = ({ timelineData = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 lg:py-32" style={{ background: '#0F1525' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B5EEA]/30 to-transparent mb-16" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#F0F4FF]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {timelineData.heading}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-[#7B5EEA]/40 via-[#3B6FD4]/20 to-transparent" />

          <div className="space-y-10">
            {timelineData.events.map((event, i) => {
              const IconComp = iconMap[event.icon] || Trophy;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative pl-12"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-lg bg-[#161D35] border border-[#7B5EEA]/30 flex items-center justify-center shadow-[0_0_12px_rgba(123,94,234,0.15)]">
                    <IconComp className="w-4 h-4 text-[#7B5EEA]" />
                  </div>

                  <div>
                    <span
                      className="text-xs text-[#4A5270] block mb-1"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {event.year}
                    </span>
                    <h3
                      className="text-lg font-bold text-[#F0F4FF] mb-1"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-sm text-[#8B93B0]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;