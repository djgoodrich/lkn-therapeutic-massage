'use client';

import React from 'react';
import { Sparkles, Check, Crown, RefreshCw, Users, Shield, ArrowRight } from 'lucide-react';
import { membershipsData } from '../data/membershipsData';
import { VAGARO_URL } from '../data/config';

export default function Memberships() {
  return (
    <section id="memberships" className="py-24 bg-moody-950 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            <span>Consistent Wellness Care</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
            Monthly Wellness{' '}
            <span className="italic font-serif gold-text-gradient font-medium">
              Memberships
            </span>
          </h2>
          
          <p className="text-moody-300 text-sm sm:text-base leading-relaxed">
            {membershipsData.subheading}
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-moody-900 border border-moody-750 text-xs text-gold-300">
            <RefreshCw className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>{membershipsData.guaranteeText}</span>
          </div>
        </div>

        {/* Tier Cards Grid (Centered 2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16 max-w-5xl mx-auto">
          {membershipsData.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular
                  ? 'bg-gradient-to-b from-moody-850 via-moody-900 to-moody-950 border-2 border-gold-400/70 shadow-2xl shadow-black/80 md:-translate-y-2'
                  : 'moody-card hover:border-gold-400/40'
              }`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 text-[10px] font-bold tracking-widest uppercase shadow-md">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                
                {/* Tier Name & Duration */}
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">
                    {tier.duration}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-moody-100 font-normal mt-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-moody-300 mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-5 rounded-2xl bg-moody-900/80 border border-moody-750 text-center space-y-1.5">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="font-serif text-4xl sm:text-5xl text-gold-300 font-bold">
                      {tier.price}
                    </span>
                    <span className="text-xs text-moody-400">/ month</span>
                  </div>
                  <span className="text-xs font-semibold text-gold-400/90 block bg-gold-500/10 py-1 px-3 rounded-full border border-gold-400/20 max-w-fit mx-auto">
                    {tier.savings}
                  </span>
                </div>

                {/* Inclusions Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-moody-400 block">
                    Membership Privileges:
                  </span>
                  <div className="space-y-2.5">
                    {tier.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-moody-200">
                        <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* CTA Button linking to Vagaro */}
              <div className="pt-8 mt-8 border-t border-moody-800">
                <a
                  href={VAGARO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 shadow-lg shadow-gold-500/25 hover:scale-[1.02]'
                      : 'bg-moody-800 hover:bg-gold-500 text-gold-300 hover:text-moody-950 border border-gold-400/30'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Member Perks & Guarantee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-moody-800">
          {membershipsData.perks.map((perk) => (
            <div key={perk.title} className="p-6 rounded-2xl bg-moody-900/60 border border-moody-800 space-y-2">
              <h4 className="font-serif text-lg text-gold-300 font-normal">
                {perk.title}
              </h4>
              <p className="text-xs text-moody-300 leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
