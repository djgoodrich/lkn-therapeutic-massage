'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis } from '../../lib/scroll';
import { initMoodVars } from '../../lib/mood';
import Nav from './Nav';
import Hero from './Hero';
import KineticManifesto from './KineticManifesto';
import JourneySelector from './JourneySelector';
import TherapeuticsMatrix from './TherapeuticsMatrix';
import Practitioners from './Practitioners';
import Visit from './Visit';
import AuraCursor from './AuraCursor';
import './immersive.css';

const AuraField = dynamic(() => import('./AuraField'), { ssr: false });

export default function ImmersiveHome() {
  const veilRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    initMoodVars();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Entry transition: the veil opens like a slow blink ---------- */
    const veil = veilRef.current;
    if (veil) {
      if (reduced) {
        gsap.set(veil, { display: 'none' });
      } else {
        gsap
          .timeline()
          .fromTo('.lkn-veil__line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'expo.inOut' })
          .to('.lkn-veil__line', { opacity: 0, duration: 0.3 }, '+=0.05')
          .fromTo(
            veil,
            { clipPath: 'inset(0% 0% 0% 0%)' },
            { clipPath: 'inset(50% 0% 50% 0%)', duration: 1.1, ease: 'expo.inOut' },
            '-=0.25'
          )
          .set(veil, { display: 'none' });
      }
    }

    /* ---------- Inertial scroll, driven by GSAP's ticker ---------- */
    let lenis = null;
    let tickerFn = null;
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
      });
      setLenis(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (reduced) return;

      /* Section headings rise through a mask as they enter. */
      gsap.utils.toArray('.lkn-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)', yPercent: 35 },
          {
            clipPath: 'inset(0% 0% -20% 0%)',
            yPercent: 0,
            duration: 1.6,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });

      /* Scroll-velocity skew — type leans into fast scrolling, then settles. */
      if (lenis) {
        const els = gsap.utils.toArray('[data-velocity-skew]');
        const setters = els.map((el) => gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3.out' }));
        lenis.on('scroll', ({ velocity }) => {
          const s = gsap.utils.clamp(-4, 4, velocity * 0.12);
          for (const set of setters) set(s);
        });
      }
    });

    return () => {
      ctx.revert();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="lkn-root relative min-h-screen bg-ink font-sans text-sand antialiased">
      <a href="#journey" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-sand focus:px-4 focus:py-2 focus:text-ink">
        Skip to session builder
      </a>

      <AuraField />
      <div className="lkn-grain pointer-events-none fixed inset-[-50%] z-[1]" aria-hidden="true" />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <KineticManifesto />
        <JourneySelector />
        <TherapeuticsMatrix />
        <Practitioners />
      </main>
      <div className="relative z-10">
        <Visit />
      </div>

      <AuraCursor />

      {/* Entry/exit veil */}
      <div id="lkn-veil" ref={veilRef} className="lkn-veil fixed inset-0 z-[150] bg-ink" aria-hidden="true">
        <span className="lkn-veil__line absolute left-[10%] right-[10%] top-1/2 h-px origin-center bg-brass/70" />
      </div>
    </div>
  );
}
