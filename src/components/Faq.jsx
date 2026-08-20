'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, Calendar } from 'lucide-react';
import { faqsData } from '../data/faqsData';
import { MASSAGEBOOK_URL } from '../data/config';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cupping & Amenities', 'Prenatal Care', 'Memberships', 'First Visit & Location'];

  const filteredFaqs = selectedCategory === 'All'
    ? faqsData
    : faqsData.filter(f => f.category === selectedCategory);

  return (
    <section id="faq" className="py-24 bg-moody-950 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
            Frequently Asked{' '}
            <span className="italic font-serif gold-text-gradient font-medium">
              Questions
            </span>
          </h2>
          <p className="text-moody-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our all-inclusive cupping, prenatal care, memberships, and Cornelius suite.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-moody-950 font-bold shadow-md'
                    : 'bg-moody-900 text-moody-300 hover:text-moody-100 border border-moody-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-moody-900/90 border-gold-400/50 shadow-xl'
                    : 'bg-moody-900/40 border-moody-800 hover:border-moody-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                    <span className="font-serif text-lg sm:text-xl text-moody-100 font-medium">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-moody-800 flex items-center justify-center shrink-0 text-gold-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-moody-300 font-light leading-relaxed border-t border-moody-800/60 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Card */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-moody-900/70 border border-moody-750 space-y-4">
          <h3 className="font-serif text-2xl text-moody-100 font-normal">Ready for restorative, expert bodywork?</h3>
          <p className="text-xs sm:text-sm text-moody-300 max-w-xl mx-auto">
            Schedule your appointment online via MassageBook to choose your preferred date, time, and session length.
          </p>
          <div className="pt-2">
            <a
              href={MASSAGEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-transform"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment on MassageBook</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
