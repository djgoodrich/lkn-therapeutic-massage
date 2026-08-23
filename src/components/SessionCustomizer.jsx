'use client';

import React, { useState } from 'react';
import { Sliders, Sparkles, Clock, Check, Flame, ArrowRight, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { MASSAGEBOOK_URL } from '../data/config';

export default function SessionCustomizer() {
  const [serviceType, setServiceType] = useState('Swedish Massage');
  const [duration, setDuration] = useState('90 Min');
  const [pressure, setPressure] = useState('Firm / Deep Tissue');
  const [focusAreas, setFocusAreas] = useState(['Neck & Shoulders', 'Lower Back & Hips']);
  const [includeCupping, setIncludeCupping] = useState(true);
  const [includeHotTowels, setIncludeHotTowels] = useState(true);

  const availableAreas = [
    'Neck & Traps',
    'Shoulders & Rotator Cuff',
    'Upper Back & Rhomboids',
    'Lower Back & Lumbar',
    'Glutes & Sciatic Pathway',
    'Hips & Pelvic Alignment',
    'Legs, Calves & Feet',
    'Forearms, Wrists & Hands',
    'Scalp, Temples & Jaw (TMJ)'
  ];

  const toggleFocusArea = (area) => {
    if (focusAreas.includes(area)) {
      if (focusAreas.length > 1) {
        setFocusAreas(focusAreas.filter(a => a !== area));
      }
    } else {
      if (focusAreas.length < 4) {
        setFocusAreas([...focusAreas, area]);
      }
    }
  };

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
    if (type === 'Swedish Massage') {
      setPressure('Medium Relaxation');
    } else if (type === 'Deep Tissue Massage') {
      setPressure('Firm / Deep Tissue');
    } else if (type === 'Master Prenatal') {
      setPressure('Gentle & Soothing');
    } else if (type === 'Targeted Chronic Pain') {
      setPressure('Deep Muscle & Fascial');
    }
  };

  return (
    <section id="customizer" className="py-24 bg-gradient-to-b from-moody-950 via-moody-900 to-moody-950 border-t border-moody-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Session Planner</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
            Design Your Ideal{' '}
            <span className="italic font-serif gold-text-gradient font-medium">
              Bodywork Treatment
            </span>
          </h2>
          <p className="text-moody-300 text-sm sm:text-base leading-relaxed">
            Plan your preferred duration, target muscle groups, and pressure. When you schedule on MassageBook, April will tailor every aspect to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-7 space-y-8 bg-moody-900/90 border border-moody-750 p-6 sm:p-8 rounded-3xl shadow-xl">
            
            {/* Step 1: Modality Style */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center space-x-2">
                <span>1. Select Treatment Modality</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Swedish Massage', 'Deep Tissue Massage', 'Master Prenatal', 'Targeted Chronic Pain'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleServiceTypeChange(type)}
                    className={`px-3 py-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      serviceType === type
                        ? 'bg-moody-800 border-gold-400 text-gold-300 shadow-md ring-1 ring-gold-400/30'
                        : 'bg-moody-850/60 border-moody-750 text-moody-300 hover:border-moody-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center space-x-2">
                <span>2. Select Session Duration</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { length: '60 Min', desc: 'Targeted Focus & Tension Relief', price: '$110' },
                  { length: '90 Min', desc: 'Comprehensive Full Body Reset', price: '$150', popular: true },
                ].map((dur) => (
                  <button
                    key={dur.length}
                    type="button"
                    onClick={() => setDuration(dur.length)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      duration === dur.length
                        ? 'bg-gradient-to-br from-moody-800 to-moody-750 border-gold-400 text-gold-300 shadow-lg ring-1 ring-gold-400/40'
                        : 'bg-moody-850/60 border-moody-750 text-moody-300 hover:border-moody-600'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-base font-bold text-moody-100">{dur.length}</span>
                      {dur.popular && (
                        <span className="text-[9px] font-bold uppercase bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded border border-gold-400/30">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xl text-gold-300 font-bold block font-serif my-1">{dur.price}</span>
                    <span className="text-[11px] text-moody-400 block">{dur.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pressure Calibration */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gold-400">
                3. Desired Pressure Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Gentle & Soothing',
                  'Medium Relaxation',
                  'Firm / Deep Tissue',
                  'Deep Muscle & Fascial'
                ].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPressure(lvl)}
                    className={`p-2.5 rounded-xl text-[11px] font-medium border text-center transition-all ${
                      pressure === lvl
                        ? 'bg-moody-800 border-gold-400 text-gold-300 font-bold'
                        : 'bg-moody-850/60 border-moody-750 text-moody-300 hover:border-moody-600'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Priority Focus Areas (Max 4) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  4. Priority Focus Areas
                </label>
                <span className="text-[11px] text-moody-400">
                  Select up to 4 ({focusAreas.length}/4 chosen)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableAreas.map((area) => {
                  const selected = focusAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleFocusArea(area)}
                      className={`p-2.5 rounded-xl text-xs font-medium border flex items-center space-x-2 transition-all ${
                        selected
                          ? 'bg-moody-800 border-gold-400 text-gold-300 font-semibold'
                          : 'bg-moody-850/50 border-moody-750 text-moody-400 hover:text-moody-200'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                        selected ? 'bg-gold-500 border-gold-400 text-moody-950' : 'border-moody-600'
                      }`}>
                        {selected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{area}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: All-Inclusive Amenities Toggles ($0) */}
            <div className="space-y-3 pt-2 border-t border-moody-800">
              <label className="text-xs font-bold uppercase tracking-wider text-gold-400 block">
                5. Complimentary Integrated Inclusions (Included at $0)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  onClick={() => setIncludeCupping(!includeCupping)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    includeCupping ? 'bg-moody-800/90 border-gold-400/60' : 'bg-moody-850/40 border-moody-750 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <div>
                      <span className="text-xs font-semibold text-moody-100 block">Integrated Cupping</span>
                      <span className="text-[10px] text-gold-300 font-medium">Included ($0 Extra)</span>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                    includeCupping ? 'bg-gold-500 border-gold-400 text-moody-950' : 'border-moody-600'
                  }`}>
                    {includeCupping && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div 
                  onClick={() => setIncludeHotTowels(!includeHotTowels)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    includeHotTowels ? 'bg-moody-800/90 border-gold-400/60' : 'bg-moody-850/40 border-moody-750 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Flame className="w-4 h-4 text-terracotta-400" />
                    <div>
                      <span className="text-xs font-semibold text-moody-100 block">Steamed Hot Towels</span>
                      <span className="text-[10px] text-gold-300 font-medium">Included ($0 Extra)</span>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                    includeHotTowels ? 'bg-gold-500 border-gold-400 text-moody-950' : 'border-moody-600'
                  }`}>
                    {includeHotTowels && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Dynamic Summary Card (Right Column) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="moody-card rounded-3xl p-6 sm:p-8 space-y-6 border-gold-400/30 shadow-2xl">
              
              <div className="border-b border-moody-800 pb-4">
                <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold block">
                  Your Customized Treatment Overview
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-moody-100 font-normal mt-1">
                  {serviceType}
                </h3>
              </div>

              {/* Summary Details */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-moody-800/70">
                  <span className="text-moody-400">Duration:</span>
                  <span className="font-bold text-moody-100 text-sm">{duration}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-moody-800/70">
                  <span className="text-moody-400">Calibrated Pressure:</span>
                  <span className="font-semibold text-moody-100">{pressure}</span>
                </div>
                <div className="py-1.5 border-b border-moody-800/70">
                  <span className="text-moody-400 block mb-1">Target Focus Areas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {focusAreas.map((area) => (
                      <span key={area} className="px-2.5 py-0.5 rounded-md bg-moody-800 text-gold-300 font-medium border border-moody-700">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="py-1.5 border-b border-moody-800/70">
                  <span className="text-moody-400 block mb-1">Complimentary Amenities:</span>
                  <div className="space-y-1">
                    {includeCupping && (
                      <div className="flex items-center space-x-1.5 text-gold-300">
                        <Check className="w-3.5 h-3.5 text-gold-400" />
                        <span>Decompression Cupping Therapy ($0)</span>
                      </div>
                    )}
                    {includeHotTowels && (
                      <div className="flex items-center space-x-1.5 text-gold-300">
                        <Check className="w-3.5 h-3.5 text-gold-400" />
                        <span>Steamed Herbal Hot Towels ($0)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-moody-400 block">Session Investment</span>
                    <span className="font-serif text-3xl text-gold-300 font-bold">
                      {duration === '60 Min' ? '$110' : '$150'}
                    </span>
                  </div>
                  <span className="text-[10px] text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded border border-gold-400/20">
                    No Hidden Fees
                  </span>
                </div>
              </div>

              {/* Direct Booking on MassageBook */}
              <a
                href={MASSAGEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-moody-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>Book This {duration} Session on MassageBook</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-center text-moody-400">
                You can select this session on MassageBook and mention your focus areas in your appointment notes.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
