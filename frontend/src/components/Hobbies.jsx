import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CircleDot, BookOpen, Plane, Wrench } from 'lucide-react';
import { hobbiesData } from '../data/mock';

const iconMap = {
  CircleDot,
  BookOpen,
  Plane,
  Wrench
};

const Hobbies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 lg:py-32" style={{ background: '#080C18' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
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
            {hobbiesData.heading}
          </h2>
          <p className="text-[#4A5270] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {hobbiesData.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {hobbiesData.items.map((item, i) => {
            const IconComp = iconMap[item.icon] || CircleDot;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group p-6 rounded-xl border border-[#1E2845]/60 bg-[#0F1525]/40 hover:border-[#7B5EEA]/15 hover:bg-[#161D35]/30 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-[#7B5EEA]/8 flex items-center justify-center group-hover:bg-[#7B5EEA]/15 transition-colors">
                  <IconComp className="w-5 h-5 text-[#7B5EEA]/70 group-hover:text-[#A78BFA] transition-colors" />
                </div>
                <h3
                  className="text-sm font-semibold text-[#F0F4FF]/80 mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs text-[#4A5270] leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;