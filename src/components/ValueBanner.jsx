'use client';

import React from 'react';
import { Sparkles, Flame, ShieldCheck, CheckCircle2, XCircle, HeartHandshake } from 'lucide-react';
import { signatureAmenities } from '../data/servicesData';
import { VAGARO_URL } from '../data/config';

export default function ValueBanner() {
  return (
    <section id="amenities" className="py-20 bg-gradient-to-b from-moody-950 via-moody-900 to-moody-950 relative overflow-hidden border-y border-moody-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-moody-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The All-Inclusive Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
            Healing Without The{' '}
            <span className="italic font-serif gold-text-gradient font-medium">
              Surprise Upcharges.
            </span>
          </h2>
          <p className="text-moody-300 text-sm sm:text-base leading-relaxed">
            Many spas treat essential therapeutic modalities as expensive add-ons. At LKN Therapeutic Massage, April integrates cupping therapy and steamed hot towels directly into your session at <strong className="text-gold-300 font-medium">no additional cost</strong> because your body deserves complete care.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {signatureAmenities.map((item, index) => (
            <div
              key={item.title}
              className="moody-card rounded-3xl p-8 relative flex flex-col justify-between group hover:border-gold-400/40"
            >
              <div className="space-y-5">
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-moody-800 border border-moody-700 flex items-center justify-center group-hover:border-gold-400/50 group-hover:scale-105 transition-all shadow-inner">
                    {index === 0 && <Sparkles className="w-7 h-7 text-gold-400" />}
                    {index === 1 && <Flame className="w-7 h-7 text-terracotta-400" />}
                    {index === 2 && <ShieldCheck className="w-7 h-7 text-moody-300" />}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-moody-400 font-medium block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-moody-100 font-normal mt-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-moody-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-moody-800 text-xs text-moody-400 italic">
                {item.details}
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-moody-900/90 border border-moody-750 p-6 sm:p-10 shadow-2xl">
          <h3 className="font-serif text-2xl text-moody-100 text-center mb-8">
            How LKN Therapeutic Massage Compares
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b border-moody-800 text-xs uppercase tracking-widest font-semibold text-moody-400">
              <div className="sm:col-span-6">Therapeutic Feature</div>
              <div className="sm:col-span-3 text-left sm:text-center text-gold-300">LKN Therapeutic</div>
              <div className="sm:col-span-3 text-left sm:text-center text-moody-400">Standard Chain Spas</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-3 items-center border-b border-moody-800/60">
              <div className="sm:col-span-6 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-sm font-medium text-moody-100">Integrated Cupping Therapy</span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center">
                <span className="text-xs font-bold text-gold-300 px-2.5 py-1 rounded bg-gold-500/20 border border-gold-400/30">
                  Included ($0 Extra)
                </span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center text-xs text-moody-400">
                +$25 to $40 Upcharge
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-3 items-center border-b border-moody-800/60">
              <div className="sm:col-span-6 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-sm font-medium text-moody-100">Steamed Herbal Hot Towels</span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center">
                <span className="text-xs font-bold text-gold-300 px-2.5 py-1 rounded bg-gold-500/20 border border-gold-400/30">
                  Included ($0 Extra)
                </span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center text-xs text-moody-400">
                +$15 to $25 Upcharge
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-3 items-center border-b border-moody-800/60">
              <div className="sm:col-span-6 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-sm font-medium text-moody-100">Master 16-Year Veteran LMT</span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center">
                <span className="text-xs font-bold text-gold-300 px-2.5 py-1 rounded bg-gold-500/20 border border-gold-400/30">
                  April Ravenwood, LMT
                </span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center text-xs text-moody-400">
                Random / Inexperienced Staff
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-3 items-center">
              <div className="sm:col-span-6 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-sm font-medium text-moody-100">Specialized Prenatal Positioning & Care</span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center">
                <span className="text-xs font-bold text-gold-300 px-2.5 py-1 rounded bg-gold-500/20 border border-gold-400/30">
                  Master Specialized Care
                </span>
              </div>
              <div className="sm:col-span-3 text-left sm:text-center text-xs text-moody-400">
                Often Limited or Surcharged
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-moody-800 text-center">
            <a
              href={VAGARO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-transform"
            >
              <span>Book Your Session on Vagaro</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
