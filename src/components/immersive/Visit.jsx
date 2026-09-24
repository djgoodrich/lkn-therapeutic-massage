'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';
import TransitionLink from './TransitionLink';
import { VAGARO_URL, BUSINESS_ADDRESS, BUSINESS_NAME, LICENSE_NUMBER } from '../../data/config';
import { membershipsData } from '../../data/membershipsData';

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`;

const HOURS = [
  ['Monday – Friday', 'By appointment · day & evening'],
  ['Saturday', 'By appointment · select slots'],
  ['Sunday', 'Closed for rest'],
];

export default function Visit() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Giant closing word breathes open as it scrolls into view.
      gsap.fromTo(
        '.vs-word',
        { letterSpacing: '-0.09em', yPercent: 30, opacity: 0.2 },
        {
          letterSpacing: '0.0em',
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.vs-word', start: 'top bottom', end: 'bottom 75%', scrub: 1 },
        }
      );
      gsap.from('.vs-col', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.vs-grid', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const tiers = membershipsData.tiers;

  return (
    <footer id="visit" ref={ref} className="relative overflow-hidden pt-32 lg:pt-44" aria-labelledby="vs-title">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">
        <p className="lkn-label mb-6 text-mood-accent">05 — Visit</p>
        <h2 id="vs-title" className="sr-only">
          Visit LKN Therapeutic Massage
        </h2>

        <div className="vs-grid grid gap-14 border-t border-sand/10 pt-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="vs-col">
            <p className="lkn-label mb-5 text-sand/40">The suite</p>
            <p className="font-serif text-2xl font-light leading-snug text-sand">
              20905 Torrence Chapel Rd
              <br />
              Suite 204, Cornelius, NC 28031
            </p>
            <div className="mt-6 flex gap-6">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="lkn-link text-xs uppercase tracking-[0.2em] text-sand/70">
                Directions ↗
              </a>
              <button type="button" onClick={copy} className="lkn-link text-xs uppercase tracking-[0.2em] text-sand/70">
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
          </div>

          <div className="vs-col">
            <p className="lkn-label mb-5 text-sand/40">Hours</p>
            <dl className="space-y-3 text-sm">
              {HOURS.map(([d, h]) => (
                <div key={d} className="flex flex-col">
                  <dt className="text-sand/80">{d}</dt>
                  <dd className="text-sand/45">{h}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="vs-col">
            <p className="lkn-label mb-5 text-sand/40">Memberships</p>
            <ul className="space-y-3 text-sm">
              {tiers.map((t) => (
                <li key={t.id} className="flex items-baseline justify-between gap-4 border-b border-sand/10 pb-3">
                  <span className="text-sand/80">{t.duration.replace(' / Month', '')}</span>
                  <span className="font-serif text-xl text-sand">
                    {t.price}
                    <span className="text-xs text-sand/40">/mo</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-sand/45">{membershipsData.guaranteeText}</p>
          </div>

          <div className="vs-col">
            <p className="lkn-label mb-5 text-sand/40">Serving</p>
            <p className="text-sm leading-relaxed text-sand/60">
              Cornelius · Davidson · Huntersville · Mooresville · the greater Lake Norman region.
            </p>
            <div className="mt-8">
              <Magnetic>
                <a href={VAGARO_URL} target="_blank" rel="noopener noreferrer" className="lkn-btn lkn-btn--solid" data-cursor="Book">
                  Reserve on Vagaro <span aria-hidden="true" className="lkn-btn__arrow">↗</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <a
        href={VAGARO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-24 block select-none text-center"
        data-cursor="Book"
        aria-label="Book your session on Vagaro"
      >
        <span className="vs-word block whitespace-nowrap font-serif text-[23vw] font-light italic leading-[0.8] text-sand transition-colors duration-700 group-hover:text-mood-accent">
          Exhale.
        </span>
      </a>

      <div className="mx-auto mt-10 flex max-w-[1500px] flex-col gap-4 border-t border-sand/10 px-5 py-8 text-[11px] uppercase tracking-[0.2em] text-sand/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
        <p>
          © {new Date().getFullYear()} {BUSINESS_NAME} · {LICENSE_NUMBER}
        </p>
        <TransitionLink href="/classic" className="lkn-link self-start text-sand/50 sm:self-auto">
          Classic site →
        </TransitionLink>
      </div>
    </footer>
  );
}
