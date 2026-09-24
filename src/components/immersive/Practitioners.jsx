'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { leadEsthetician } from '../../data/servicesData';
import { VAGARO_URL, LICENSE_NUMBER } from '../../data/config';

const PEOPLE = [
  {
    id: 'april',
    name: 'April Ravenwood',
    role: `Licensed Massage & Bodywork Therapist · ${LICENSE_NUMBER}`,
    years: '16',
    image: '/images/april-ravenwood.jpg',
    alt: 'April Ravenwood, LMT, founder of LKN Therapeutic Massage',
    quote: 'True bodywork isn’t a routine script — it’s an attentive conversation with your muscles, fascia and nervous system.',
    body: 'Over sixteen years, April has developed a nuanced read of how chronic strain, posture and life transitions settle into the body. She blends deep tissue, myofascial and trigger-point work with restorative flow, and is deeply experienced in prenatal care. She founded the practice on one conviction: cupping and steamed herbal towels should be part of the work, not an add-on.',
    focus: ['Deep tissue & myofascial', 'Chronic pain & tech-neck', 'Prenatal, every trimester'],
  },
  {
    id: 'katelynn',
    name: leadEsthetician.name,
    role: leadEsthetician.title,
    years: '6',
    image: leadEsthetician.image,
    alt: `${leadEsthetician.name}, ${leadEsthetician.title}`,
    quote: leadEsthetician.quote,
    body: leadEsthetician.bio[1],
    focus: leadEsthetician.specialties.map((s) => s.title),
  },
];

export default function Practitioners() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pr-frame').forEach((frame) => {
        const img = frame.querySelector('.pr-img');
        gsap.fromTo(
          frame,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.8,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: frame, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          img,
          { yPercent: -10, scale: 1.2 },
          {
            yPercent: 10,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
      gsap.utils.toArray('.pr-copy > *').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="practitioners" ref={ref} className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-8 lg:px-14 lg:py-44" aria-labelledby="pr-title">
      <p className="lkn-label mb-6 text-mood-accent">04 — The hands</p>
      <h2
        id="pr-title"
        className="lkn-reveal mb-24 font-serif text-[clamp(2.6rem,6vw,5.8rem)] font-light leading-[0.95] tracking-[-0.02em] text-sand"
        data-velocity-skew
      >
        Practitioners, <em className="text-mood-accent">not</em> a rotation.
      </h2>

      <div className="space-y-32 lg:space-y-48">
        {PEOPLE.map((p, i) => (
          <article key={p.id} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className={`relative lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
              <div className="pr-frame relative aspect-[4/5] overflow-hidden rounded-[2px] bg-midnight">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="pr-img object-cover grayscale-[35%] contrast-[1.05] will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-mood-a/20 mix-blend-color" />
              </div>
              <p
                aria-hidden="true"
                className={`absolute -bottom-10 font-serif text-[clamp(7rem,14vw,12rem)] font-light leading-none text-sand/90 ${
                  i % 2 ? '-left-4 lg:-left-16' : '-right-2 lg:-right-14'
                }`}
              >
                {p.years}
                <span className="ml-2 align-top font-sans text-[10px] uppercase tracking-[0.3em] text-mood-accent">years</span>
              </p>
            </div>

            <div className={`pr-copy lg:col-span-6 ${i % 2 ? 'lg:order-1' : 'lg:col-start-7'}`}>
              <p className="lkn-label text-sand/45">{p.role}</p>
              <h3 className="mt-4 font-serif text-[clamp(2.4rem,4.4vw,4rem)] font-light leading-none text-sand">{p.name}</h3>
              <blockquote className="mt-8 border-l border-mood-accent/40 pl-6 font-serif text-2xl font-light italic leading-snug text-sand/85">
                “{p.quote.replace(/^"|"$/g, '')}”
              </blockquote>
              <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-sand/60">{p.body}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {p.focus.map((f) => (
                  <li key={f} className="rounded-full border border-sand/10 px-4 py-2 text-[11px] tracking-wide text-sand/60">
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={VAGARO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lkn-link mt-10 inline-block text-xs uppercase tracking-[0.24em] text-sand"
              >
                Book with {p.name.split(' ')[0]} ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
