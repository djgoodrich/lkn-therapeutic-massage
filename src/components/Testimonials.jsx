'use client';

import React from 'react';
import { Sparkles, Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export default function Testimonials() {
  return (
    <section className="py-24 bg-moody-950 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-gold-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lake Norman Client Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
            Kind Words From{' '}
            <span className="italic font-serif gold-text-gradient font-medium">
              Restored Clients
            </span>
          </h2>
          <p className="text-moody-300 text-sm sm:text-base leading-relaxed">
            Read how April’s 16 years of intuitive bodywork, all-inclusive cupping, and prenatal care have helped clients across Cornelius, Davidson, and Huntersville.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((t, idx) => (
            <div
              key={idx}
              className="moody-card rounded-3xl p-8 flex flex-col justify-between relative group hover:border-gold-400/40"
            >
              <div className="space-y-4">
                
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gold-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-moody-700 group-hover:text-gold-400/40 transition-colors" />
                </div>

                <p className="text-sm sm:text-base text-moody-200 font-serif italic leading-relaxed">
                  "{t.quote}"
                </p>

              </div>

              <div className="pt-6 mt-6 border-t border-moody-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-moody-100">{t.author}</h4>
                  <span className="text-xs text-moody-400">{t.location}</span>
                </div>
                <span className="text-[11px] font-semibold text-gold-300 px-3 py-1 rounded-full bg-moody-850 border border-gold-400/20">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
