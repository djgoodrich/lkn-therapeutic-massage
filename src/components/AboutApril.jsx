'use client';

import React from 'react';
import { Award, Heart, Sparkles, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import { VAGARO_URL } from '../data/config';

export default function AboutApril() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-moody-950 via-moody-900 to-moody-950 relative border-t border-moody-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Photo Placeholder */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="rounded-3xl p-1.5 bg-gradient-to-b from-gold-400/40 via-moody-750 to-moody-900 shadow-2xl">
                <div className="rounded-[22px] bg-moody-900 overflow-hidden relative p-6 sm:p-8 space-y-6">
                  
                  {/* Photo Spot */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-moody-950 border border-moody-700/80 shadow-2xl group">
                    <img
                      src="/images/april-ravenwood.jpg"
                      alt="April Ravenwood, Licensed Massage Therapist in Cornelius, NC"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Subtle moody vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-moody-950 via-moody-950/20 to-transparent pointer-events-none" />

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400/60" />

                    {/* Overlay Credential Badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-moody-900/90 backdrop-blur-md border border-gold-400/30 text-left shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-gold-400" />
                          <span className="text-xs font-bold text-moody-100">April Ravenwood, LMT</span>
                        </div>
                        <span className="text-[10px] font-bold text-gold-300 uppercase px-2 py-0.5 rounded bg-gold-500/15 border border-gold-400/20">
                          16 Yrs Exp
                        </span>
                      </div>
                      <span className="text-[10px] text-moody-400 block mt-1">
                        Licensed Massage & Bodywork Therapist • Cornelius, NC
                      </span>
                    </div>
                  </div>

                  {/* Quick Credentials List */}
                  <div className="grid grid-cols-2 gap-3 text-left pt-2">
                    <div className="p-3 rounded-xl bg-moody-850 border border-moody-800">
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 font-bold block">
                        Experience
                      </span>
                      <span className="text-sm font-semibold text-moody-100 block">
                        16 Years Practice
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-moody-850 border border-moody-800">
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 font-bold block">
                        Specialty
                      </span>
                      <span className="text-sm font-semibold text-moody-100 block">
                        Therapeutic & Prenatal
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Bio & Healing Philosophy */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Meet Your Therapist</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
              Meet <span className="italic font-serif gold-text-gradient font-medium">April Ravenwood, LMT</span>
            </h2>

            <p className="text-lg text-gold-300/90 font-serif italic">
              "True bodywork isn’t a routine script—it’s an attentive conversation with your muscles, fascia, and nervous system."
            </p>

            <div className="space-y-4 text-sm sm:text-base text-moody-300 font-light leading-relaxed">
              <p>
                With <strong className="text-moody-100 font-medium">16 years of dedicated practice as a licensed massage therapist</strong>, April has developed an intuitive, highly nuanced understanding of how chronic strain, postural stress, and life transitions manifest in the body.
              </p>
              
              <p>
                April specializes in <strong className="text-moody-100 font-medium">therapeutic bodywork</strong> that bridges targeted relief with deep, restorative relaxation. Whether you are dealing with stubborn neck knots, sciatic nerve discomfort, or athletic fatigue, she tailors every stroke to your exact tolerance.
              </p>

              <p>
                She is also <strong className="text-moody-100 font-medium">deeply experienced in prenatal massage</strong>, providing expecting mothers throughout the Lake Norman area with safe, deeply comforting positioning and targeted relief from the physical strains of pregnancy.
              </p>

              <p>
                April founded <strong className="text-gold-300 font-medium">LKN Therapeutic Massage</strong> in Cornelius with a core conviction: modalities like <strong className="text-moody-100 font-medium">cupping therapy and steamed herbal hot towels</strong> shouldn't be costly add-ons—they should be integrated seamlessly to give you the most restorative results possible.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-moody-800">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-moody-800 border border-gold-400/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-moody-100">Zero Nickel-and-Diming</h4>
                  <p className="text-xs text-moody-400">Cupping & hot towels always included at $0 upcharge.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-moody-800 border border-gold-400/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-terracotta-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-moody-100">Maternal & Prenatal Focus</h4>
                  <p className="text-xs text-moody-400">16 years of certified, compassionate prenatal care.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={VAGARO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule with April on Vagaro</span>
              </a>
              
              <div className="flex items-center text-xs text-moody-400 space-x-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Suite 204 • Cornelius, NC</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
