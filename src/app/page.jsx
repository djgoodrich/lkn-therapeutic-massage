'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ValueBanner from '../components/ValueBanner';
import Services from '../components/Services';
import SessionCustomizer from '../components/SessionCustomizer';
import Memberships from '../components/Memberships';
import AboutApril from '../components/AboutApril';
import Testimonials from '../components/Testimonials';
import LocationHours from '../components/LocationHours';
import Faq from '../components/Faq';
import AmbientSoundscape from '../components/AmbientSoundscape';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-moody-950 text-moody-100 flex flex-col font-sans selection:bg-gold-500 selection:text-moody-950">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Dramatic Moody Hero */}
        <Hero 
          onOpenCustomizer={() => {
            const el = document.getElementById('customizer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* The LKN Standard: Zero Upcharge for Cupping & Hot Towels */}
        <ValueBanner />

        {/* Signature Modalities & Rates */}
        <Services />

        {/* Interactive Session Builder */}
        <SessionCustomizer />

        {/* Monthly Wellness Memberships */}
        <Memberships />

        {/* Meet April Ravenwood, LMT (16 Years Experience) */}
        <AboutApril />

        {/* Lake Norman Client Testimonials */}
        <Testimonials />

        {/* Location & Practice Hours (Suite 204 Cornelius) */}
        <LocationHours />

        {/* Frequently Asked Questions */}
        <Faq />

      </main>

      {/* Footer */}
      <Footer />

      {/* Atmospheric Spa Sanctuary Ambience Toggle */}
      <AmbientSoundscape />

    </div>
  );
}
