'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Copy, Check, Navigation, Car, Sparkles, Phone, Mail, ExternalLink } from 'lucide-react';
import { VAGARO_URL, BUSINESS_ADDRESS } from '../data/config';

export default function LocationHours() {
  const [copied, setCopied] = useState(false);

  const address = BUSINESS_ADDRESS;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-24 bg-gradient-to-b from-moody-950 via-moody-900 to-moody-950 relative border-t border-moody-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Cornelius, NC Practice</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-moody-100 font-normal">
            Location & Practice Hours
          </h2>
          <p className="text-moody-300 text-sm sm:text-base leading-relaxed">
            Conveniently located in the heart of Lake Norman, just off I-77 Exit 28 on Torrence Chapel Road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Address, Suite Guidance, Hours */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address Card */}
            <div className="moody-card rounded-3xl p-8 space-y-6 border-gold-400/30">
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-moody-800 border border-gold-400/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">
                      Lake Norman Studio
                    </span>
                    <h3 className="font-serif text-2xl text-moody-100 font-normal mt-0.5">
                      LKN Therapeutic Massage
                    </h3>
                    <div className="flex items-center space-x-2 mt-1 mb-2">
                      <span className="text-xs text-gold-300 font-medium">April Ravenwood, LMT</span>
                      <span className="text-[10px] text-moody-300 bg-moody-800 px-2 py-0.5 rounded border border-gold-400/20 font-sans">NC LMBT #12129</span>
                    </div>
                    <p className="text-sm text-moody-300 mt-1">
                      20905 Torrence Chapel Road, Suite 204<br />
                      Cornelius, NC 28031
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Copy & Directions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleCopyAddress}
                  className="px-4 py-2.5 rounded-xl bg-moody-800 hover:bg-moody-750 text-moody-200 text-xs font-semibold flex items-center space-x-2 border border-moody-700 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-gold-400" /> : <Copy className="w-4 h-4 text-gold-400" />}
                  <span>{copied ? 'Address Copied!' : 'Copy Full Address'}</span>
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-moody-950 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md hover:scale-[1.02] transition-transform"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Suite 204 Arrival Guide */}
              <div className="pt-4 border-t border-moody-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-moody-400 block">
                  Suite 204 Arrival Guide:
                </span>
                <p className="text-xs text-moody-300 leading-relaxed">
                  Located on the <strong>second floor (Suite 204)</strong>. Accessible via elevator or stairs. Ample free parking is available directly in front of the building. Please arrive in a calm mindset 5–10 minutes before your scheduled appointment.
                </p>
              </div>

            </div>

            {/* Hours & Availability Card */}
            <div className="moody-card rounded-3xl p-8 space-y-4">
              <div className="flex items-center space-x-3 text-gold-400 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif text-xl text-moody-100">Session Hours</h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-moody-800">
                  <span className="text-moody-300 font-medium">Monday – Friday</span>
                  <span className="text-gold-300 font-semibold">By Appointment (Day & Evening Slots)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-moody-800">
                  <span className="text-moody-300 font-medium">Saturday</span>
                  <span className="text-gold-300 font-semibold">By Appointment (Select Slots)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-moody-300 font-medium">Sunday</span>
                  <span className="text-moody-400 italic">Closed for Rest & Recovery</span>
                </div>
              </div>

              <div className="pt-4 border-t border-moody-800 flex items-center justify-between">
                <span className="text-xs text-moody-400">Private One-on-One Sessions</span>
                <a
                  href={VAGARO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 underline underline-offset-4 flex items-center space-x-1"
                >
                  <span>Book on Vagaro &rarr;</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Map / Directions Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="moody-card rounded-3xl p-8 space-y-6 border-moody-750">
              
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">
                  Area Landmark Guide
                </span>
                <h3 className="font-serif text-2xl text-moody-100 font-normal">
                  Serving the Lake Norman Area
                </h3>
              </div>

              {/* Travel Distances */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-moody-850 border border-moody-800">
                  <span className="text-sm font-bold text-gold-300 block">Cornelius</span>
                  <span className="text-[11px] text-moody-400">Center (1-3 min)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-moody-850 border border-moody-800">
                  <span className="text-sm font-bold text-gold-300 block">Davidson</span>
                  <span className="text-[11px] text-moody-400">~6 mins away</span>
                </div>
                <div className="p-3.5 rounded-xl bg-moody-850 border border-moody-800">
                  <span className="text-sm font-bold text-gold-300 block">Huntersville</span>
                  <span className="text-[11px] text-moody-400">~8 mins away</span>
                </div>
              </div>

              {/* Interactive Google Map Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-moody-900 border border-moody-700/80 shadow-2xl group">
                <iframe
                  title="LKN Therapeutic Massage Location - 20905 Torrence Chapel Rd Suite 204, Cornelius, NC"
                  src="https://maps.google.com/maps?q=20905+Torrence+Chapel+Road+Suite+204+Cornelius+NC+28031&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[1.05] opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Directions Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-moody-950/90 backdrop-blur-md border border-gold-400/30 shadow-xl pointer-events-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-gold-500/20 border border-gold-400/40 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-gold-400" />
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-semibold text-moody-100 block truncate">Suite 204 • Free Client Parking</span>
                      <span className="text-[9px] text-moody-400 block">Just off I-77 Exit 28</span>
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-moody-950 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 shrink-0 transition-transform active:scale-95 shadow-sm"
                  >
                    <span>Directions</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Note on Appointments */}
              <div className="p-4 rounded-xl bg-moody-850/60 border border-moody-800 text-xs text-moody-300 leading-relaxed">
                <strong className="text-gold-300">Appointment-Only Practice:</strong> To preserve the quiet, private serenity of our clients during their sessions, walk-in visits cannot be accommodated. Please schedule online via Vagaro in advance.
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
