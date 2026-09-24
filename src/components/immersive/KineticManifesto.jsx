'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATEMENT =
  'Tension is a story the body keeps telling. We listen to it — layer by layer, breath by breath — until it has nothing left to hold.';

const PILLARS = [
  { value: '16', unit: 'years', label: 'Licensed hands-on practice — April Ravenwood, LMT' },
  { value: '$0', unit: 'upcharge', label: 'Decompression cupping & steamed herbal towels, always included' },
  { value: '1:1', unit: 'private', label: 'One therapist, one client, one quiet suite — nothing shared' },
];

/**
 * Scroll-linked kinetic typography.
 * A sticky stage (CSS sticky — no pin-spacer reflow) whose words surface
 * from the dark as the reader scrolls, while two outline marquees drift
 * in opposite directions. Everything is transform/opacity only.
 */
export default function KineticManifesto() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.km-word');
      if (reduced) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom 85%',
            scrub: 0.6,
          },
        })
        .fromTo(
          words,
          { opacity: 0.08, yPercent: 30 },
          { opacity: 1, yPercent: 0, ease: 'none', stagger: 0.12, duration: 1 },
          0
        )
        .to('.km-statement', { yPercent: -8, ease: 'none', duration: words.length * 0.12 + 1 }, 0);

      gsap.fromTo(
        '.km-marquee-a',
        { xPercent: 0 },
        {
          xPercent: -28,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
      gsap.fromTo(
        '.km-marquee-b',
        { xPercent: -28 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );

      gsap.utils.toArray('.km-pillar').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1.3,
          ease: 'expo.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
        const line = el.querySelector('.km-rule');
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: 'expo.inOut',
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={ref} className="relative" aria-label="Our philosophy">
      <div className="relative h-[150vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          {/* Drifting outline marquees */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[10%] select-none">
            <p className="km-marquee-a lkn-outline whitespace-nowrap font-serif text-[18vw] font-light leading-none">
              Release · Restore · Breathe · Release · Restore ·
            </p>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[6%] select-none">
            <p className="km-marquee-b lkn-outline whitespace-nowrap font-serif text-[18vw] font-light italic leading-none">
              Listen · Soften · Lengthen · Listen · Soften ·
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-14">
            <p className="lkn-label mb-8 text-mood-accent">01 — The approach</p>
            <p className="km-statement max-w-[18ch] font-serif text-[clamp(2.2rem,5.6vw,5.6rem)] font-light leading-[1.02] tracking-[-0.015em] text-sand sm:max-w-[22ch]">
              {STATEMENT.split(' ').map((w, i) => (
                <span key={i} className="km-word inline-block pr-[0.24em]">
                  {w.includes('layer') || w.includes('breath') ? <em className="text-mood-accent">{w}</em> : w}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1500px] gap-14 px-5 pb-32 pt-10 sm:px-8 md:grid-cols-3 md:gap-10 lg:px-14">
        {PILLARS.map((p) => (
          <div key={p.value} className="km-pillar">
            <div className="km-rule mb-8 h-px origin-left bg-gradient-to-r from-mood-accent/70 to-transparent" />
            <p className="font-serif text-[clamp(4rem,7vw,6.5rem)] font-light leading-none text-sand">
              {p.value}
              <span className="ml-3 align-top font-sans text-xs uppercase tracking-[0.3em] text-mood-accent">
                {p.unit}
              </span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/60">{p.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
