'use client';

import { useEffect, useRef } from 'react';

/**
 * AuraCursor — a soft ring that trails the pointer and swells with a label
 * over anything carrying `data-cursor`. Fine pointers only; the rAF loop
 * idles itself as soon as the ring has caught up.
 */
export default function AuraCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    document.documentElement.classList.add('has-aura-cursor');
    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let raf = 0;
    let activeLabel = '';

    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.16;
      lag.y += (pos.y - lag.y) * 0.16;
      ring.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      if (Math.abs(pos.x - lag.x) + Math.abs(pos.y - lag.y) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (!raf) raf = requestAnimationFrame(loop);

      const t = e.target instanceof Element ? e.target.closest('[data-cursor], a, button, input') : null;
      const next = t ? t.getAttribute('data-cursor') || '•' : '';
      if (next !== activeLabel) {
        activeLabel = next;
        ring.dataset.state = next ? (next === '•' ? 'hover' : 'label') : '';
        label.textContent = next === '•' ? '' : next;
      }
    };
    // Content moves under a still pointer while scrolling — re-evaluate.
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const el = document.elementFromPoint(pos.x, pos.y);
        if (el) move({ clientX: pos.x, clientY: pos.y, target: el });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const down = () => ring.classList.add('is-down');
    const up = () => ring.classList.remove('is-down');
    const leave = () => {
      ring.style.opacity = '0';
      dot.style.opacity = '0';
    };
    const enter = () => {
      ring.style.opacity = '';
      dot.style.opacity = '';
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.classList.remove('has-aura-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
    };
  }, []);

  return (
    <div aria-hidden="true" className="lkn-cursor pointer-events-none fixed left-0 top-0 z-[100] hidden [@media(pointer:fine)]:block">
      <div ref={ringRef} className="lkn-cursor__ring">
        <span ref={labelRef} className="lkn-cursor__label" />
      </div>
      <div ref={dotRef} className="lkn-cursor__dot" />
    </div>
  );
}
