'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import Magnetic from './Magnetic';
import { scrollToId } from '../../lib/scroll';
import { VAGARO_URL } from '../../data/config';

// WebGL is client-only; keep three.js out of the server bundle and off the
// critical path for first paint.
const HeroTorso = dynamic(() => import('./HeroTorso'), { ssr: false });

const LINE_1 = ['Let', 'the', 'body'];
const LINE_2 = ['finally'];

export default function Hero() {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const pctRef = useRef(null);
  const [unwound, setUnwound] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.hw-inner, .hero-fade', { opacity: 1, yPercent: 0, y: 0 });
        return;
      }
      const tl = gsap.timeline({ delay: 0.55 });
      tl.from('.hero-kicker', { opacity: 0, y: 14, duration: 1.1, ease: 'power3.out' })
        .from(
          '.hw-inner',
          {
            yPercent: 115,
            rotate: 5,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.out',
            stagger: 0.085,
          },
          '-=0.8'
        )
        // "exhale" lengthens with the torso — tracking opens over ~4s.
        .fromTo(
          '.hw-exhale',
          { letterSpacing: '-0.075em' },
          { letterSpacing: '0.005em', duration: 3.6, ease: 'sine.inOut' },
          0.35
        )
        .from(
          '.hero-fade',
          { opacity: 0, y: 18, duration: 1.2, ease: 'power3.out', stagger: 0.12 },
          '-=2.6'
        );
    }, root);
    return () => ctx.revert();
  }, []);

  const onProgress = (u) => {
    // Direct DOM writes — no React re-render per frame.
    if (ringRef.current) ringRef.current.style.strokeDashoffset = String(119.4 * (1 - u));
    if (pctRef.current) pctRef.current.textContent = `${Math.round(u * 100)}`;
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      aria-label="Introduction"
    >
      <HeroTorso onProgress={onProgress} onUnwound={() => setUnwound(true)} />

      {/* Legibility wash on small screens where type overlaps the sculpture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent md:hidden"
      />

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-28 sm:px-8 md:justify-center md:pb-0 lg:px-14">
        <p className="hero-kicker lkn-label mb-6 flex items-center gap-3 text-sand/70">
          <span className="inline-block h-px w-10 bg-mood-accent/70" />
          Therapeutic massage &amp; clinical esthetics · Cornelius, NC
        </p>

        <h1 className="font-serif text-[clamp(3.1rem,8.6vw,8.8rem)] font-light leading-[0.9] tracking-[-0.02em] text-sand">
          <span className="block">
            {LINE_1.map((w) => (
              <span key={w} className="hw mr-[0.22em]">
                <span className="hw-inner">{w}</span>
              </span>
            ))}
          </span>
          <span className="block">
            {LINE_2.map((w) => (
              <span key={w} className="hw mr-[0.22em]">
                <span className="hw-inner">{w}</span>
              </span>
            ))}
            <span className="hw">
              <span className="hw-inner hw-exhale italic text-mood-accent">exhale.</span>
            </span>
          </span>
        </h1>

        <p className="hero-fade mt-8 max-w-md text-[15px] leading-relaxed text-sand/70 sm:text-base">
          Sixteen years of listening with the hands. Private, one-on-one bodywork on Lake Norman —
          with cupping and steamed herbal towels always included.
        </p>

        <div className="hero-fade pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={VAGARO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lkn-btn lkn-btn--solid"
              data-cursor="Book"
            >
              Reserve on Vagaro
              <span aria-hidden="true" className="lkn-btn__arrow">↗</span>
            </a>
          </Magnetic>
          <Magnetic>
            <button type="button" onClick={() => scrollToId('journey')} className="lkn-btn">
              Build your session
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Unwind meter */}
      <div className="hero-fade pointer-events-none absolute bottom-7 right-5 z-10 flex items-center gap-4 sm:right-8 lg:right-14">
        <div className="text-right">
          <p className="lkn-label text-sand/60">{unwound ? 'Fully unwound' : 'Drag to unwind'}</p>
          <p className="mt-1 font-serif text-sm italic text-sand/40">
            {unwound ? 'Now imagine ninety minutes.' : 'Release what it’s holding'}
          </p>
        </div>
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
            <circle cx="22" cy="22" r="19" fill="none" stroke="rgb(228 217 198 / 0.12)" strokeWidth="1" />
            <circle
              ref={ringRef}
              cx="22"
              cy="22"
              r="19"
              fill="none"
              stroke="rgb(var(--lkn-accent))"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="119.4"
              strokeDashoffset="119.4"
            />
          </svg>
          <span
            ref={pctRef}
            className="absolute inset-0 grid place-items-center font-sans text-[10px] tabular-nums text-sand/70"
          >
            0
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => scrollToId('manifesto')}
        className="hero-fade group absolute bottom-7 left-5 z-10 hidden items-center gap-3 sm:left-8 md:flex lg:left-14"
        aria-label="Scroll to continue"
      >
        <span className="relative block h-10 w-px overflow-hidden bg-sand/15">
          <span className="lkn-scrollcue absolute inset-x-0 top-0 h-1/2 bg-mood-accent" />
        </span>
        <span className="lkn-label text-sand/50 transition-colors group-hover:text-sand">Scroll</span>
      </button>
    </section>
  );
}
