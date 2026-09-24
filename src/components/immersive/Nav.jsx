'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { scrollToId, getLenis } from '../../lib/scroll';
import { VAGARO_URL } from '../../data/config';

const LINKS = [
  { id: 'journey', label: 'Session' },
  { id: 'therapeutics', label: 'Therapeutics' },
  { id: 'practitioners', label: 'Practitioners' },
  { id: 'visit', label: 'Visit' },
];

export default function Nav() {
  const ref = useRef(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.from(el, { opacity: 0, y: -12, duration: 1.2, delay: 1.2, ease: 'power3.out' });

    // Hide on scroll down, reveal on scroll up; solidify after the hero.
    let lastY = 0;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY && y > 200;
      if (down !== hidden) {
        hidden = down;
        el.style.transform = hidden ? 'translateY(-110%)' : 'translateY(0)';
      }
      el.dataset.solid = y > window.innerHeight * 0.6 ? 'true' : 'false';
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (menu) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  const go = (id) => {
    setMenu(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        ref={ref}
        data-solid="false"
        className="lkn-nav fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-14">
          <button type="button" onClick={() => go('top')} className="group flex items-baseline gap-3" aria-label="LKN Therapeutic Massage — back to top">
            <span className="font-serif text-2xl font-medium tracking-[0.04em] text-sand">LKN</span>
            <span className="hidden text-[10px] uppercase tracking-[0.34em] text-sand/50 transition-colors group-hover:text-sand/80 sm:inline">
              Therapeutic Massage
            </span>
          </button>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <button key={l.id} type="button" onClick={() => go(l.id)} className="lkn-link text-[11px] uppercase tracking-[0.24em] text-sand/65 hover:text-sand">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={VAGARO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lkn-btn lkn-btn--sm"
              data-cursor="Book"
            >
              Book
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center md:hidden"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
            >
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-px w-full bg-sand transition-transform duration-500 ${menu ? 'translate-y-1.5 rotate-45' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px w-full bg-sand transition-transform duration-500 ${menu ? '-translate-y-1.5 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          menu ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!menu}
      >
        {LINKS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            tabIndex={menu ? 0 : -1}
            onClick={() => go(l.id)}
            className="py-3 text-left font-serif text-5xl font-light text-sand"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="mr-4 align-middle font-sans text-[10px] tracking-[0.3em] text-mood-accent">0{i + 2}</span>
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
}
