'use client';

import React from 'react';
import { Sparkles, Calendar, Award, ShieldCheck, Heart, MapPin, ArrowRight, Flame } from 'lucide-react';
import { MASSAGEBOOK_URL } from '../data/config';

export default function Hero({ onOpenCustomizer }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-moody-950">
      {/* Moody atmospheric ambient glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-moody-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-terracotta-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle organic background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Messaging */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* 16-Year Master LMT Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-moody-900/90 border border-gold-400/30 text-gold-300 text-xs sm:text-sm font-medium tracking-wide shadow-md backdrop-blur-sm animate-pulse-slow">
              <Award className="w-4 h-4 text-gold-400 shrink-0" />
              <span>16 Years of Master Therapeutic Touch • Cornelius, NC</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-moody-100 font-normal leading-[1.15] tracking-tight">
              Intuitive Therapeutic Bodywork for{' '}
              <span className="font-serif italic gold-text-gradient font-medium">
                Deep, Lasting Relief.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-moody-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong className="text-moody-100 font-medium">LKN Therapeutic Massage</strong> by{' '}
              <strong className="text-gold-300 font-medium">April Ravenwood, LMT</strong>. Experience deeply customized therapeutic massage, specialized prenatal care, and true restorative relief in a private Lake Norman sanctuary.
            </p>

            {/* Differentiator Banner: Cupping & Hot Towels Included */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-moody-900 via-moody-850 to-moody-900 border border-moody-600/40 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start space-x-3.5 text-left">
                <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-gold-300" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-400/20">
                      The LKN Standard
                    </span>
                    <span className="text-xs font-medium text-moody-300">Always $0 Upcharge</span>
                  </div>
                  <p className="text-sm text-moody-100 font-medium mt-1">
                    Integrated Cupping Therapy & Steamed Herbal Hot Towels are included in every session at no extra charge.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={MASSAGEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-moody-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2.5"
              >
                <Calendar className="w-4 h-4 text-moody-950" />
                <span>Book on MassageBook</span>
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById('memberships');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-moody-850 hover:bg-moody-800 text-moody-200 hover:text-gold-300 font-medium text-sm tracking-wider uppercase border border-moody-700 hover:border-gold-400/50 transition-all flex items-center justify-center space-x-2"
              >
                <span>View Memberships</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Points Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-moody-800/80 text-left">
              <div className="flex items-center space-x-2 text-xs text-moody-300">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>16 Yrs Licensed LMT</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-moody-300">
                <Heart className="w-4 h-4 text-terracotta-400 shrink-0" />
                <span>Prenatal Specialist</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-moody-300">
                <Flame className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Hot Towels Included</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-moody-300">
                <MapPin className="w-4 h-4 text-moody-400 shrink-0" />
                <span>Cornelius Suite 204</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Aesthetic Moody Image / Photo Placeholder Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Border Frame */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-gold-400/40 via-moody-700 to-moody-900 shadow-2xl shadow-black/80">
                
                {/* Inner Card Container */}
                <div className="rounded-[22px] bg-moody-900/90 overflow-hidden relative border border-moody-750 p-6 sm:p-8 space-y-6">
                  
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-moody-950 border border-moody-700/80 shadow-2xl group">
                    <img
                      src="/images/april-ravenwood.jpg"
                      alt="April Ravenwood, LMT - LKN Therapeutic Massage in Cornelius, NC"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Atmospheric gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-moody-950 via-moody-950/25 to-transparent pointer-events-none" />

                    {/* Floating Info Overlay on Hero Card */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-moody-900/95 backdrop-blur-md border border-gold-400/30 text-left shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block">
                            Master Therapist & Founder
                          </span>
                          <h4 className="font-serif text-lg text-moody-100 font-normal">
                            April Ravenwood, LMT
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold text-gold-300 uppercase px-2.5 py-1 rounded-full bg-gold-500/20 border border-gold-400/30">
                          16 Yrs Exp
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-moody-800 text-[11px] text-moody-300">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>Cupping & Steamed Hot Towels Included ($0)</span>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400/60" />
                  </div>

                  {/* Interactive Custom Session Callout Box */}
                  <div className="p-4 rounded-xl bg-moody-800/80 border border-moody-700 text-left flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-gold-300 block">
                        Want a Tailored Session?
                      </span>
                      <span className="text-xs text-moody-400">
                        Explore focus areas & durations
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const el = document.getElementById('customizer');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-moody-700 hover:bg-gold-500 hover:text-moody-950 text-gold-300 text-xs font-medium transition-colors shrink-0"
                    >
                      Explore Options
                    </button>
                  </div>

                </div>
              </div>

              {/* Floating review badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 p-4 rounded-2xl bg-moody-900/95 border border-gold-400/30 shadow-2xl backdrop-blur-md max-w-[260px] hidden sm:block">
                <div className="flex items-center space-x-1 text-gold-400 text-xs mb-1">
                  {'★'.repeat(5)}
                </div>
                <p className="text-xs text-moody-200 italic line-clamp-2">
                  "No upcharges for cupping or hot towels. April is simply in a league of her own."
                </p>
                <span className="text-[10px] text-gold-300 font-semibold block mt-1">
                  — Verified LKN Client
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
