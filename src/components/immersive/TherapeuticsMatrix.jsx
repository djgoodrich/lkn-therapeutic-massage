'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { treatments, TISSUE_LAYERS, addOns } from '../../data/immersiveData';
import { setMood } from '../../lib/mood';
import { VAGARO_URL } from '../../data/config';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'massage', label: 'Massage' },
  { id: 'esthetics', label: 'Esthetics' },
];

function DepthGauge({ depth, compact = false }) {
  return (
    <div className={`flex flex-col ${compact ? 'gap-[3px]' : 'gap-1'}`} aria-hidden="true">
      {TISSUE_LAYERS.map((l, i) => (
        <span
          key={l}
          className={`block h-px origin-left transition-all duration-700 ${
            i < depth ? 'bg-mood-accent' : 'bg-sand/15'
          }`}
          style={{ width: `${100 - i * 12}%`, transitionDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

function DepthDiagram({ depth }) {
  return (
    <div className="relative">
      <div className="space-y-px overflow-hidden rounded-sm">
        {TISSUE_LAYERS.map((l, i) => {
          const lit = i < depth;
          return (
            <div
              key={l}
              className="tm-layer relative flex items-center justify-between px-4 py-3"
              style={{
                background: lit
                  ? `rgb(var(--lkn-a) / ${0.18 + i * 0.1})`
                  : 'rgb(228 217 198 / 0.03)',
              }}
            >
              <span className={`text-[11px] uppercase tracking-[0.22em] ${lit ? 'text-sand' : 'text-sand/30'}`}>
                {l}
              </span>
              <span className={`font-serif text-sm italic ${lit ? 'text-mood-accent' : 'text-sand/20'}`}>
                {lit ? 'reached' : '—'}
              </span>
            </div>
          );
        })}
      </div>
      {/* Pressure wave descending to the treatment depth */}
      <span
        className="tm-probe pointer-events-none absolute left-0 right-0 h-px bg-mood-light shadow-[0_0_18px_2px_rgb(var(--lkn-light)/0.6)]"
        style={{ '--depth': `${(depth / TISSUE_LAYERS.length) * 100}%` }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function TherapeuticsMatrix() {
  const gridRef = useRef(null);
  const flipState = useRef(null);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);

  const visible = treatments.filter((t) => filter === 'all' || t.kind === filter);

  const capture = () => {
    if (!gridRef.current) return;
    flipState.current = Flip.getState(gridRef.current.querySelectorAll('.tm-cell'));
  };

  const toggle = (t) => {
    capture();
    setOpen((cur) => (cur === t.id ? null : t.id));
    if (open !== t.id) setMood(t.mood);
  };

  const changeFilter = (f) => {
    if (f === filter) return;
    capture();
    setOpen(null);
    setFilter(f);
  };

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  // Animate layout change after React commits the new DOM.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !gridRef.current) return;
    flipState.current = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    Flip.from(state, {
      targets: gridRef.current.querySelectorAll('.tm-cell'),
      duration: reduced ? 0 : 0.85,
      ease: 'expo.inOut',
      absolute: false,
      scale: false,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.05 }),
    });

    const detail = gridRef.current.querySelector('.tm-detail');
    if (detail && !reduced) {
      gsap.fromTo(
        detail.querySelectorAll('.tm-stagger'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07, delay: 0.35 }
      );
      gsap.fromTo(
        detail.querySelectorAll('.tm-layer'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.45 }
      );
    }
  }, [open, filter]);

  // Cursor spotlight — one delegated listener writing two CSS vars.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const move = (e) => {
      const cell = e.target instanceof Element ? e.target.closest('.tm-cell') : null;
      if (!cell) return;
      const r = cell.getBoundingClientRect();
      cell.style.setProperty('--mx', `${e.clientX - r.left}px`);
      cell.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    grid.addEventListener('pointermove', move, { passive: true });
    return () => grid.removeEventListener('pointermove', move);
  }, []);

  return (
    <section
      id="therapeutics"
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-8 lg:px-14 lg:py-44"
      aria-labelledby="tm-title"
    >
      <div className="mb-14 flex flex-col gap-10 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="lkn-label mb-6 text-mood-accent">03 — The therapeutics</p>
          <h2
            id="tm-title"
            className="lkn-reveal font-serif text-[clamp(2.6rem,6vw,5.8rem)] font-light leading-[0.95] tracking-[-0.02em] text-sand"
            data-velocity-skew
          >
            A matrix of <em className="text-mood-accent">depth</em>.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-sand/55">
            Every treatment, mapped by how deep it works and what it changes physiologically. Open any
            cell to see the tissue layers it reaches.
          </p>
        </div>

        <div className="flex gap-1 rounded-full border border-sand/10 p-1" role="tablist" aria-label="Filter treatments">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => changeFilter(f.id)}
              className={`rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                filter === f.id ? 'bg-sand text-ink' : 'text-sand/60 hover:text-sand'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid grid-flow-row-dense grid-cols-1 gap-px md:grid-cols-2 xl:grid-cols-4"
      >
        {visible.map((t, i) => {
          const isOpen = open === t.id;
          return (
            <article
              key={t.id}
              data-flip-id={t.id}
              className={`tm-cell group relative bg-ink/80 shadow-[0_0_0_1px_rgb(228_217_198/0.1)] ${isOpen ? 'is-open md:col-span-2 xl:col-span-4' : ''}`}
            >
              <button
                type="button"
                onClick={() => toggle(t)}
                aria-expanded={isOpen}
                aria-controls={`tm-${t.id}`}
                className="relative z-10 flex w-full flex-col p-7 text-left sm:p-8"
                data-cursor={isOpen ? 'Close' : 'Open'}
              >
                <div className="flex w-full items-start justify-between">
                  <span className="font-sans text-[11px] tabular-nums tracking-[0.2em] text-sand/35">
                    {String(treatments.indexOf(t) + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full border border-sand/15 text-sand/60 transition-all duration-700 group-hover:border-mood-accent/60 group-hover:text-mood-accent ${
                      isOpen ? 'rotate-45 border-mood-accent/60 text-mood-accent' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>

                <p className="mt-10 text-[10px] uppercase tracking-[0.28em] text-mood-accent/80">{t.system}</p>
                <h3
                  className={`mt-3 font-serif font-light leading-[1.02] text-sand transition-all duration-700 ${
                    isOpen ? 'text-[clamp(2.2rem,4vw,3.6rem)]' : 'text-[1.9rem]'
                  }`}
                >
                  {t.title}
                </h3>

                {!isOpen && (
                  <div className="mt-10 grid w-full grid-cols-[1fr_auto] items-end gap-6">
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-sand/35">Depth</p>
                      <DepthGauge depth={t.depth} compact />
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-sand/45">
                        {t.durations.map((d) => d.length.replace(' Min', '')).join(' · ')} min
                      </p>
                      <p className="mt-1 font-serif text-2xl text-sand">from {t.fromPrice}</p>
                    </div>
                  </div>
                )}
              </button>

              {isOpen && (
                <div id={`tm-${t.id}`} className="tm-detail relative z-10 px-7 pb-9 sm:px-8 lg:pb-12">
                  <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <p className="tm-stagger text-[15px] leading-relaxed text-sand/75">{t.description}</p>
                      {t.provider && (
                        <p className="tm-stagger mt-5 text-xs text-sand/45">Performed by {t.provider}</p>
                      )}
                      {t.disclaimer && (
                        <p className="tm-stagger mt-5 border-l border-mood-accent/40 pl-4 text-xs leading-relaxed text-sand/50">
                          {t.disclaimer}
                        </p>
                      )}
                      <p className="tm-stagger mt-6 font-serif text-lg italic text-mood-accent">{t.highlight}</p>
                    </div>

                    <div className="lg:col-span-4">
                      <p className="tm-stagger mb-4 text-[10px] uppercase tracking-[0.26em] text-sand/40">
                        Treatment depth · {t.pressure}
                      </p>
                      <DepthDiagram depth={t.depth} />
                    </div>

                    <div className="lg:col-span-4">
                      <p className="tm-stagger mb-4 text-[10px] uppercase tracking-[0.26em] text-sand/40">
                        Physiological benefits
                      </p>
                      <ul className="space-y-4">
                        {t.benefits.map((b, bi) => (
                          <li key={b} className="tm-stagger flex gap-4 text-sm leading-relaxed text-sand/75">
                            <span className="mt-[0.2em] font-serif text-sm italic text-mood-accent">
                              {String(bi + 1).padStart(2, '0')}
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      {t.kind === 'esthetics' && addOns[0] && (
                        <p className="tm-stagger mt-6 text-xs text-sand/50">
                          Add {addOns[0].title} (+{addOns[0].price}): {addOns[0].description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="tm-stagger mt-12 flex flex-col gap-6 border-t border-sand/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {t.durations.map((d) => (
                        <a
                          key={d.length}
                          href={VAGARO_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lkn-chip is-link"
                          data-cursor="Book"
                        >
                          {d.length.replace(' Min', ' min')} <span className="ml-2 text-mood-accent">{d.pricePlaceholder}</span>
                          {d.popular && <span className="ml-2 text-[9px] opacity-60">RECOMMENDED</span>}
                        </a>
                      ))}
                    </div>
                    <a
                      href={VAGARO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lkn-btn lkn-btn--solid self-start"
                    >
                      Schedule on Vagaro <span aria-hidden="true" className="lkn-btn__arrow">↗</span>
                    </a>
                  </div>
                </div>
              )}

              <span className="tm-spot pointer-events-none absolute inset-0" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
