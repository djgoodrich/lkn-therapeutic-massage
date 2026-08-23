'use client';

import React, { useState } from 'react';
import { Sparkles, Clock, Check, Calendar, ArrowRight, Heart, Shield, Image as ImageIcon } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { MASSAGEBOOK_URL } from '../data/config';

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Swedish Massage', 'Deep Tissue', 'Prenatal Care'];

  const filteredServices = activeFilter === 'All'
    ? servicesData
    : activeFilter === 'Swedish Massage'
    ? servicesData.filter(s => s.id === 'swedish' || s.category.toLowerCase().includes('swedish'))
    : activeFilter === 'Deep Tissue'
    ? servicesData.filter(s => s.id === 'deep-tissue' || s.id === 'pain-relief' || s.category.toLowerCase().includes('deep tissue') || s.category.toLowerCase().includes('therapeutic'))
    : activeFilter === 'Prenatal Care'
    ? servicesData.filter(s => s.isPrenatal || s.category.toLowerCase().includes('prenatal'))
    : servicesData.filter(s => s.category === activeFilter);

  return (
    <section id="services" className="py-24 bg-moody-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-moody-900 border border-moody-700 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Bodywork Modalities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
            Tailored Treatments & Rates
          </h2>
          <p className="text-moody-300 text-sm sm:text-base leading-relaxed">
            Every session begins with an anatomical consultation. Cupping therapy and steamed herbal hot towels are integrated wherever indicated at <strong className="text-gold-300 font-medium">no additional charge</strong>.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 font-bold shadow-lg shadow-gold-500/20'
                    : 'bg-moody-900 text-moody-300 hover:text-moody-100 hover:bg-moody-850 border border-moody-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Services List / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={service.id === 'prenatal' ? 'prenatal' : undefined}
              className="moody-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group"
            >
              <div className="space-y-6">
                
                {/* Photo Header */}
                {service.image ? (
                  <div className="relative aspect-[16/9] rounded-2xl bg-moody-900 border border-moody-700/80 overflow-hidden shadow-2xl group/img">
                    <img
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                    />
                    {/* Moody atmospheric gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-moody-950 via-moody-950/35 to-transparent pointer-events-none" />
                    
                    {/* Sleek overlay info badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="text-[11px] font-semibold text-gold-300 px-3 py-1 rounded-full bg-moody-950/90 backdrop-blur-md border border-gold-400/30 shadow-md">
                        {service.category}
                      </span>
                      <span className="text-[10px] text-moody-200 px-2.5 py-1 rounded-full bg-moody-950/85 backdrop-blur-md border border-moody-700/80 shadow-md">
                        Cornelius, NC • Suite 204
                      </span>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-gold-400/60 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-gold-400/60 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative aspect-[16/8] rounded-2xl bg-gradient-to-br from-moody-800 via-moody-850 to-moody-900 border border-moody-700/80 overflow-hidden flex items-center justify-center p-4 shadow-inner">
                    <div className="text-center space-y-1.5 z-10">
                      <div className="w-10 h-10 rounded-full bg-moody-700/80 border border-gold-400/40 flex items-center justify-center mx-auto">
                        <ImageIcon className="w-5 h-5 text-gold-400" />
                      </div>
                      <span className="text-[11px] font-medium text-gold-300 block">
                        [Photo Slot: {service.imagePlaceholder}]
                      </span>
                      <span className="text-[10px] text-moody-400 block">
                        {service.category} • Cornelius, NC
                      </span>
                    </div>
                    {/* Subtle decorative grid lines */}
                    <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                  </div>
                )}

                {/* Header Information */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                      {service.category}
                    </span>
                    <span className="text-[11px] font-semibold text-moody-200 px-3 py-1 rounded-full bg-moody-800/80 border border-gold-400/30">
                      {service.highlight}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-moody-100 font-normal">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gold-300/90 font-medium italic mt-1">
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-moody-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits Checklist */}
                <div className="space-y-2 pt-2 border-t border-moody-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-moody-400 block">
                    Session Focus & Benefits:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-moody-200">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration & Pricing Options */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-moody-400 block">
                    Available Durations & Pricing:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.durations.map((dur) => (
                      <div
                        key={dur.length}
                        className={`p-3.5 rounded-xl border text-center transition-all ${
                          dur.popular
                            ? 'bg-moody-800/90 border-gold-400/60 shadow-md ring-1 ring-gold-400/30'
                            : 'bg-moody-850/60 border-moody-700/60'
                        }`}
                      >
                        {dur.popular && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-gold-400 block mb-1">
                            RECOMMENDED
                          </span>
                        )}
                        <span className="text-sm font-bold text-moody-100 block">
                          {dur.length}
                        </span>
                        <span className="font-serif text-2xl text-gold-300 font-bold block my-0.5">
                          {dur.pricePlaceholder}
                        </span>
                        <span className="text-[11px] text-moody-300 block">
                          {dur.focus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Trigger */}
              <div className="pt-6 mt-6 border-t border-moody-800">
                <a
                  href={MASSAGEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-moody-800 hover:bg-gold-500 text-gold-300 hover:text-moody-950 font-semibold text-xs tracking-wider uppercase border border-gold-400/30 hover:border-gold-400 transition-all flex items-center justify-center space-x-2 group-hover:shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {service.title} on MassageBook</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
