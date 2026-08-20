'use client';

import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Award, Heart, ShieldCheck, ArrowUp, Calendar } from 'lucide-react';
import { MASSAGEBOOK_URL } from '../data/config';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-moody-950 border-t border-moody-800 text-moody-300 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-moody-800">
          
          {/* Col 1: Brand & Bio Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-moody-800 border border-gold-400/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <span className="font-serif text-xl text-moody-100 font-semibold block">
                  LKN <span className="text-gold-400 italic font-light">Therapeutic</span> Massage
                </span>
                <span className="text-[11px] uppercase tracking-widest text-moody-400 block font-sans">
                  April Ravenwood, LMT • 16 Yrs Experience
                </span>
              </div>
            </div>

            <p className="text-xs text-moody-400 leading-relaxed max-w-sm">
              Customized therapeutic massage, certified master prenatal care, and deep restorative relief in Cornelius, NC. Cupping therapy and steamed hot towels are always included with zero upcharge.
            </p>

            <div className="text-xs text-gold-300/80 space-y-1">
              <div>North Carolina Licensed Massage & Bodywork Therapist</div>
              <div className="text-[11px] text-moody-500">[NC LMBT #License Placeholder]</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-moody-100">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-gold-300 transition-colors">Services & Rates</a>
              </li>
              <li>
                <a href="#prenatal" className="hover:text-gold-300 transition-colors">Prenatal Care</a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-gold-300 transition-colors">Cupping & Hot Towels</a>
              </li>
              <li>
                <a href="#memberships" className="hover:text-gold-300 transition-colors">Wellness Memberships</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-300 transition-colors">Meet April Ravenwood</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-300 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Highlights */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-moody-100">
              The LKN Promise
            </h4>
            <ul className="space-y-2.5 text-xs text-moody-300">
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>Cupping Therapy Included ($0 extra)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>Steamed Herbal Hot Towels ($0 extra)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>16-Year Master Prenatal Care</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>Rollover Monthly Memberships</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Booking CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-moody-100">
              Lake Norman Practice
            </h4>
            
            <div className="text-xs text-moody-300 space-y-1.5">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  20905 Torrence Chapel Road<br />
                  Suite 204<br />
                  Cornelius, NC 28031
                </span>
              </div>
            </div>

            <a
              href={MASSAGEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book on MassageBook</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-moody-500">
          <p>
            &copy; {new Date().getFullYear()} LKN Therapeutic Massage & April Ravenwood, LMT. All rights reserved. Serving Cornelius, Davidson, Huntersville & Lake Norman, NC.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-moody-400 hover:text-gold-300 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
