'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Navigation } from 'lucide-react';
import { VAGARO_URL, BUSINESS_ADDRESS } from '../data/config';

export default function MobileQuickBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 300px (past hero)
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-moody-950/95 backdrop-blur-xl border-t border-moody-800/80 px-4 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-full bg-moody-900 hover:bg-moody-850 border border-moody-750 text-moody-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors text-center"
        >
          <Navigation className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>Directions</span>
        </a>

        <a
          href={VAGARO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] py-3 px-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-moody-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg shadow-gold-500/25 transition-transform active:scale-95 text-center"
        >
          <Calendar className="w-3.5 h-3.5 text-moody-950 shrink-0" />
          <span>Book on Vagaro</span>
        </a>
      </div>
    </div>
  );
}
