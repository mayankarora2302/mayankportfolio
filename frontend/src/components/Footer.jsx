import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => (
  <footer className="py-8 border-t border-[#1E2845]/30" style={{ background: '#080C18' }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center gap-2">
      <Shield className="w-4 h-4 text-[#7B5EEA]/40" />
      <p
        className="text-sm text-[#4A5270]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Built by Mayank Arora &middot; 2025
      </p>
    </div>
  </footer>
);

export default Footer;