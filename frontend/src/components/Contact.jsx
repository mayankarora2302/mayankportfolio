import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { contactData } from '../data/mock';

const iconMap = {
  Mail, Phone, Github, Linkedin, Instagram
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ background: '#0F1525' }}>
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
            {contactData.heading}
          </h2>
          <p className="text-[#4A5270] text-sm max-w-xl mx-auto" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {contactData.sub}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {contactData.copy.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-[#8B93B0] leading-relaxed mb-5 text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {para}
              </p>
            ))}

            <a
              href={contactData.ctaEmail}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#7B5EEA] to-[#3B6FD4] text-white font-medium hover:shadow-[0_0_30px_rgba(123,94,234,0.3)] transition-all duration-300 hover:-translate-y-1 mt-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Send me an email
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {contactData.contacts.map((c, i) => {
              const IconComp = iconMap[c.icon] || Mail;
              return (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('mailto:') || c.href.startsWith('tel:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#1E2845] bg-[#161D35]/40 hover:border-[#7B5EEA]/25 hover:bg-[#7B5EEA]/5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#7B5EEA]/10 flex items-center justify-center group-hover:bg-[#7B5EEA]/20 transition-colors">
                    <IconComp className="w-5 h-5 text-[#7B5EEA]" />
                  </div>
                  <span
                    className="text-sm text-[#8B93B0] group-hover:text-[#F0F4FF] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {c.label}
                  </span>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;