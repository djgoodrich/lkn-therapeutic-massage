'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { MASSAGEBOOK_URL } from '../data/config';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services & Rates', href: '#services' },
    { label: 'Prenatal Care', href: '#prenatal' },
    { label: 'Cupping & Amenities', href: '#amenities' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Meet April', href: '#about' },
    { label: 'Location & Hours', href: '#location' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-moody-950/90 backdrop-blur-md border-b border-moody-750/70 shadow-2xl py-3'
            : 'bg-gradient-to-b from-moody-950/95 via-moody-950/70 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <a href="#" className="group flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-moody-800 to-moody-900 border border-gold-400/40 flex items-center justify-center shadow-inner group-hover:border-gold-400 transition-colors">
                <Sparkles className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl tracking-wide font-semibold text-moody-100 block group-hover:text-gold-300 transition-colors">
                  LKN <span className="text-gold-400 font-light italic">Therapeutic</span> Massage
                </span>
                <span className="text-[11px] tracking-widest uppercase text-moody-400 block font-sans">
                  April Ravenwood, LMT • 16 Yrs Exp • Cornelius, NC
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-5 xl:space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs uppercase tracking-widest text-moody-300 hover:text-gold-300 font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-400 hover:after:w-full after:transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Direct Link to MassageBook with Generous Spacing */}
            <div className="hidden lg:flex items-center ml-8 xl:ml-10 pl-6 xl:pl-8 border-l border-moody-750/80">
              <a
                href={MASSAGEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-moody-950 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-95 flex items-center space-x-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-moody-950" />
                <span>Book Appointment</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a
                href={MASSAGEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-gold-400 text-moody-950 text-xs font-semibold uppercase tracking-wider md:hidden"
              >
                Book
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-moody-200 hover:text-gold-300 hover:bg-moody-850 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-moody-950/98 backdrop-blur-xl border-b border-moody-750 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium tracking-wide text-moody-200 hover:text-gold-300 hover:bg-moody-850/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-moody-800 space-y-3">
              <div className="flex items-center text-xs text-moody-400 space-x-2 px-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>20905 Torrence Chapel Rd Suite 204, Cornelius, NC</span>
              </div>
              <a
                href={MASSAGEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 font-bold text-sm tracking-wider uppercase shadow-lg shadow-gold-500/20 text-center flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book on MassageBook</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
