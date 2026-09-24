'use client';

import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { journeyStations, treatments, PRESSURE_STEPS, MASSAGE_INCLUSIONS, addOns } from '../../data/immersiveData';
import { setMood } from '../../lib/mood';
import { VAGARO_URL } from '../../data/config';
import Magnetic from './Magnetic';

const N = journeyStations.length;
const STEP = 360 / N;
const stationAngle = (i) => -90 + i * STEP; // degrees, 0 = 3 o'clock, clockwise
const REST_ANGLE = stationAngle(N - 1) + STEP / 2; // parked between last & first
const BREATH = { stress: '11s', deep: '8s', pain: '7s', prenatal: '10s', esthetics: '6s' };

const norm = (a) => ((a % 360) + 360) % 360;
const shortest = (from, to) => {
  let d = norm(to - from);
  if (d > 180) d -= 360;
  return from + d;
};
const nearestIndex = (deg) => {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < N; i++) {
    const d = Math.abs(((norm(deg - stationAngle(i)) + 180) % 360) - 180);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
};
const TICK_RING = (
  <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
    {Array.from({ length: 90 }).map((_, i) => {
      const a = (i / 90) * Math.PI * 2;
      const long = i % 18 === 0;
      const r1 = long ? 150 : 155;
      return (
        <line
          key={i}
          x1={(200 + Math.cos(a) * r1).toFixed(2)}
          y1={(200 + Math.sin(a) * r1).toFixed(2)}
          x2={(200 + Math.cos(a) * 163).toFixed(2)}
          y2={(200 + Math.sin(a) * 163).toFixed(2)}
          stroke="rgb(228 217 198)"
          strokeOpacity={long ? 0.35 : 0.13}
          strokeWidth="1"
        />
      );
    })}
    <circle cx="200" cy="200" r="160" fill="none" stroke="rgb(228 217 198 / 0.12)" />
  </svg>
);

// Angular distance (deg) from the stone to a station.
const distTo = (deg, i) => Math.abs(((norm(deg - stationAngle(i)) + 180) % 360) - 180);
// Selection only changes once the stone is clearly past the midpoint between
// two stations — no flicker (and no palette/re-render churn) at the boundary.
const HYSTERESIS = 7;

const priceNum = (p) => Number(String(p || '').replace(/[^0-9.]/g, '')) || 0;

export default function JourneySelector() {
  const dialRef = useRef(null);
  const orbRef = useRef(null);
  const glowRef = useRef(null);
  const centerRef = useRef(null);
  const proxy = useRef({ a: REST_ANGLE });
  const geo = useRef({ cx: 0, cy: 0, r: 0, size: 0 });
  const dragging = useRef(false);

  const [idx, setIdx] = useState(null);
  const idxRef = useRef(null);
  const [serviceId, setServiceId] = useState(null);
  const [durationIdx, setDurationIdx] = useState(0);
  const [pressure, setPressure] = useState(1);
  const [incl, setIncl] = useState({ cupping: true, towels: true, aroma: false });
  const [highFreq, setHighFreq] = useState(false);
  const [copied, setCopied] = useState(false);

  const station = idx === null ? null : journeyStations[idx];
  const service = useMemo(() => treatments.find((t) => t.id === serviceId) || null, [serviceId]);
  const isMassage = service?.kind === 'massage';

  /* ---------- orb placement (transform only) ---------- */
  const applyAngle = useCallback((deg) => {
    const { r, size } = geo.current;
    const rad = (deg * Math.PI) / 180;
    const x = size / 2 + Math.cos(rad) * r;
    const y = size / 2 + Math.sin(rad) * r;
    if (orbRef.current) orbRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    if (glowRef.current) glowRef.current.style.transform = `rotate(${deg}deg)`;
  }, []);

  const measure = useCallback(() => {
    const el = dialRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    geo.current = {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      r: rect.width * 0.4,
      size: rect.width,
    };
    applyAngle(proxy.current.a);
  }, [applyAngle]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (dialRef.current) ro.observe(dialRef.current);
    return () => ro.disconnect();
  }, [measure]);

  /* ---------- selection ---------- */
  const choose = useCallback((i) => {
    if (idxRef.current === i) return;
    idxRef.current = i;
    const st = journeyStations[i];
    setMood(st.mood); // palette eases on its own rAF — no React work
    setIdx(i);
    // The composer panel is heavier; let React render it at low priority so
    // it can never steal frames from the stone while it is being dragged.
    startTransition(() => {
      setServiceId(st.serviceIds[0]);
      const svc = treatments.find((t) => t.id === st.serviceIds[0]);
      const pop = svc?.durations.findIndex((d) => d.popular) ?? -1;
      setDurationIdx(pop > -1 ? pop : 0);
      setPressure(st.id === 'deep' || st.id === 'pain' ? 2 : 1);
      setCopied(false);
    });
  }, []);

  const snapTo = useCallback(
    (i, duration = 0.9) => {
      const to = shortest(proxy.current.a, stationAngle(i));
      gsap.killTweensOf(proxy.current);
      gsap.to(proxy.current, {
        a: to,
        duration,
        ease: 'expo.out',
        onUpdate: () => applyAngle(proxy.current.a),
      });
      choose(i);
    },
    [applyAngle, choose]
  );

  /* ---------- drag ---------- */
  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    let smooth = null;

    let lastAngle = 0;
    const angleFrom = (e) => {
      // Re-read the centre each move (cheap, one element) so page scroll or
      // layout changes mid-drag can never make the stone jump.
      const rect = dial.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Near the centre the angle is unstable — hold the last good angle.
      if (Math.hypot(dx, dy) < rect.width * 0.14) return lastAngle;
      lastAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      return lastAngle;
    };

    const down = (e) => {
      if (!(e.target instanceof Element) || !e.target.closest('[data-dial-grab]')) return;
      e.preventDefault();
      measure(); // re-cache the rect once per gesture, never per move
      dragging.current = true;
      dial.classList.add('is-dragging');
      dial.setPointerCapture?.(e.pointerId);
      gsap.killTweensOf(proxy.current);
      lastAngle = proxy.current.a;
      smooth = gsap.quickTo(proxy.current, 'a', {
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => applyAngle(proxy.current.a),
      });
      move(e);
    };
    const move = (e) => {
      if (!dragging.current) return;
      const target = shortest(proxy.current.a, angleFrom(e));
      smooth(target);
      const i = nearestIndex(target);
      const cur = idxRef.current;
      if (cur === null || (i !== cur && distTo(target, cur) - distTo(target, i) > HYSTERESIS)) {
        choose(i);
      }
    };
    const up = (e) => {
      if (!dragging.current) return;
      dragging.current = false;
      dial.classList.remove('is-dragging');
      dial.releasePointerCapture?.(e.pointerId);
      snapTo(nearestIndex(proxy.current.a), 0.9);
    };

    dial.addEventListener('pointerdown', down);
    dial.addEventListener('pointermove', move);
    dial.addEventListener('pointerup', up);
    dial.addEventListener('pointercancel', up);
    return () => {
      dial.removeEventListener('pointerdown', down);
      dial.removeEventListener('pointermove', move);
      dial.removeEventListener('pointerup', up);
      dial.removeEventListener('pointercancel', up);
    };
  }, [applyAngle, choose, measure, snapTo]);

  /* ---------- centre copy transition ---------- */
  useEffect(() => {
    if (!centerRef.current || idx === null) return;
    gsap.fromTo(
      centerRef.current.children,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05, overwrite: true }
    );
  }, [idx]);

  const onKey = (e) => {
    const cur = idx ?? -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      snapTo((cur + 1 + N) % N);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      snapTo((cur - 1 + N) % N);
    }
  };

  /* ---------- summary ---------- */
  const duration = service?.durations[durationIdx] || service?.durations[0];
  const total = priceNum(duration?.pricePlaceholder) + (!isMassage && highFreq ? priceNum(addOns[0]?.price) : 0);
  const extras = isMassage
    ? MASSAGE_INCLUSIONS.filter((i) => incl[i.id]).map((i) => i.label.replace(', on request', ''))
    : highFreq
    ? [addOns[0]?.title]
    : [];
  const notes = service
    ? [
        `${duration?.length} ${service.title}`,
        isMassage ? `${PRESSURE_STEPS[pressure]} pressure` : null,
        extras.length ? `With: ${extras.join(', ')}` : null,
        isMassage && !incl.cupping ? 'Please skip cupping' : null,
      ]
        .filter(Boolean)
        .join(' · ')
    : '';

  const copyNotes = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <section
      id="journey"
      className="relative mx-auto max-w-[1500px] px-5 py-32 sm:px-8 lg:px-14 lg:py-44"
      style={{ '--breath': station ? BREATH[station.id] : '11s' }}
      aria-labelledby="journey-title"
    >
      <div className="mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12">
        <p className="lkn-label text-mood-accent lg:col-span-3">02 — Session builder</p>
        <h2
          id="journey-title"
          className="lkn-reveal font-serif text-[clamp(2.6rem,6vw,5.8rem)] font-light leading-[0.95] tracking-[-0.02em] text-sand lg:col-span-9"
          data-velocity-skew
        >
          Where is your body <em className="text-mood-accent">asking</em> for help?
        </h2>
      </div>

      <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-10">
        {/* ---------------- Dial ---------------- */}
        <div className="lg:sticky lg:top-24 lg:col-span-6">
          <div
            ref={dialRef}
            className="lkn-dial relative mx-auto aspect-square w-[84%] max-w-[560px] touch-none select-none sm:w-[82%] lg:w-full"
          >
            {/* Tick ring (static — never re-renders) */}
            {TICK_RING}

            {/* Light that travels with the stone */}
            <div ref={glowRef} className="lkn-dial-glow absolute inset-0" aria-hidden="true" />

            {/* Breathing core — pace follows the chosen focus */}
            <div className="pointer-events-none absolute inset-[24%] rounded-full" aria-hidden="true">
              <span className="lkn-breathe absolute inset-0 rounded-full border border-mood-accent/25" />
              <span className="lkn-breathe lkn-breathe--late absolute inset-[12%] rounded-full border border-mood-accent/15" />
              <span className="absolute inset-[22%] rounded-full bg-mood-a/20 blur-2xl" />
            </div>

            {/* Centre copy */}
            <div className="pointer-events-none absolute inset-[26%] flex items-center justify-center text-center">
              <div ref={centerRef} aria-live="polite">
                {station ? (
                  <>
                    <p className="lkn-label text-mood-accent">{station.kicker}</p>
                    <p className="mt-3 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-none text-sand">
                      {station.label}
                    </p>
                    <p className="mx-auto mt-4 hidden max-w-[24ch] text-xs leading-relaxed text-sand/55 sm:block">
                      {station.line}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="lkn-label text-sand/50">Begin here</p>
                    <p className="mt-3 font-serif text-2xl italic text-sand/80 sm:text-3xl">Drag the stone</p>
                    <p className="mt-2 text-xs text-sand/45">to the focus that feels right</p>
                  </>
                )}
              </div>
            </div>

            {/* Station labels */}
            {journeyStations.map((s, i) => {
              const a = (stationAngle(i) * Math.PI) / 180;
              const active = idx === i;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => snapTo(i)}
                  className={`lkn-station absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${
                    active ? 'is-active' : ''
                  }`}
                  style={{ left: `${(50 + Math.cos(a) * 49).toFixed(3)}%`, top: `${(50 + Math.sin(a) * 49).toFixed(3)}%` }}
                  aria-pressed={active}
                >
                  <span className="lkn-station__dot" aria-hidden="true" />
                  {s.label}
                </button>
              );
            })}

            {/* The stone */}
            <div
              ref={orbRef}
              data-dial-grab
              data-cursor="Drag"
              role="slider"
              tabIndex={0}
              aria-label="Therapeutic focus"
              aria-valuemin={0}
              aria-valuemax={N - 1}
              aria-valuenow={idx ?? 0}
              aria-valuetext={station ? station.label : 'No focus selected'}
              onKeyDown={onKey}
              className="lkn-orb absolute left-0 top-0 cursor-grab"
            >
              <span className="lkn-orb__halo" aria-hidden="true" />
              <span className="lkn-orb__core" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-sand/40">
            Drag the stone around the ring — or use the arrow keys.
          </p>
        </div>

        {/* ---------------- Composer ---------------- */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className={`transition-opacity duration-700 ${service ? 'opacity-100' : 'opacity-40'}`}>
            {/* Treatment */}
            <div className="border-t border-sand/10 py-6">
              <div className="mb-4 flex items-baseline justify-between">
                <p className="lkn-label text-sand/50">i. Treatment</p>
                {service?.provider && (
                  <p className="text-[11px] text-sand/40">with {service.provider.split(',')[0]}</p>
                )}
              </div>
              {station && station.serviceIds.length > 1 ? (
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Facial treatment">
                  {station.serviceIds.map((sid) => {
                    const t = treatments.find((x) => x.id === sid);
                    return (
                      <button
                        key={sid}
                        type="button"
                        role="radio"
                        aria-checked={serviceId === sid}
                        onClick={() => {
                          setServiceId(sid);
                          setDurationIdx(0);
                        }}
                        className={`lkn-chip ${serviceId === sid ? 'is-on' : ''}`}
                      >
                        {t?.short}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="font-serif text-3xl font-light text-sand">{service?.title || '—'}</p>
              )}
            </div>

            {/* Duration */}
            <div className="border-t border-sand/10 py-6">
              <p className="lkn-label mb-4 text-sand/50">ii. Time on the table</p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Session length">
                {(service?.durations || [{ length: '60 Min' }, { length: '90 Min' }]).map((d, i) => (
                  <button
                    key={d.length}
                    type="button"
                    role="radio"
                    aria-checked={durationIdx === i}
                    disabled={!service}
                    onClick={() => setDurationIdx(i)}
                    className={`lkn-chip ${service && durationIdx === i ? 'is-on' : ''}`}
                  >
                    {d.length.replace(' Min', ' min')}
                    {d.pricePlaceholder && <span className="ml-2 opacity-60">{d.pricePlaceholder}</span>}
                  </button>
                ))}
              </div>
              {duration?.focus && <p className="mt-3 text-xs leading-relaxed text-sand/45">{duration.focus}</p>}
            </div>

            {/* Pressure / Add-on */}
            {(!service || isMassage) && (
              <div className="border-t border-sand/10 py-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="lkn-label text-sand/50">iii. Pressure</p>
                  <p className="font-serif text-lg italic text-mood-accent">{PRESSURE_STEPS[pressure]}</p>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={pressure}
                  disabled={!service}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  className="lkn-range w-full"
                  aria-label="Preferred pressure"
                  aria-valuetext={PRESSURE_STEPS[pressure]}
                  style={{ '--p': `${(pressure / 3) * 100}%` }}
                />
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-sand/35">
                  {PRESSURE_STEPS.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-sand/10 py-6">
              <p className="lkn-label mb-4 text-sand/50">{isMassage || !service ? 'iv. Included, always $0' : 'iii. Add-on'}</p>
              {isMassage || !service ? (
                <div className="flex flex-wrap gap-2">
                  {MASSAGE_INCLUSIONS.map((i) => (
                    <button
                      key={i.id}
                      type="button"
                      aria-pressed={incl[i.id]}
                      disabled={!service}
                      onClick={() => setIncl((s) => ({ ...s, [i.id]: !s[i.id] }))}
                      className={`lkn-chip ${service && incl[i.id] ? 'is-on' : ''}`}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  aria-pressed={highFreq}
                  onClick={() => setHighFreq((v) => !v)}
                  className={`lkn-chip ${highFreq ? 'is-on' : ''}`}
                >
                  {addOns[0]?.title} <span className="ml-2 opacity-60">+{addOns[0]?.price}</span>
                </button>
              )}
            </div>

            {/* Summary */}
            <div className="border-t border-sand/10 pt-8">
              <div className="flex items-end justify-between gap-6">
                <p className="max-w-[30ch] text-sm leading-relaxed text-sand/70">
                  {service ? notes : 'Choose a focus on the dial to compose your session.'}
                </p>
                <p className="font-serif text-5xl font-light tabular-nums text-sand">
                  {service ? `$${total}` : '—'}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={VAGARO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`lkn-btn lkn-btn--solid ${service ? '' : 'pointer-events-none opacity-50'}`}
                    aria-disabled={!service}
                    data-cursor="Book"
                  >
                    Reserve on Vagaro <span aria-hidden="true" className="lkn-btn__arrow">↗</span>
                  </a>
                </Magnetic>
                <button
                  type="button"
                  onClick={copyNotes}
                  disabled={!service}
                  className="lkn-link text-xs uppercase tracking-[0.2em] text-sand/60 disabled:opacity-30"
                >
                  {copied ? 'Copied — paste into booking notes' : 'Copy notes for your therapist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
