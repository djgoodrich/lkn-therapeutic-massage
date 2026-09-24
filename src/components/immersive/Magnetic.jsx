'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Magnetic — pulls its child toward the pointer while hovered.
 * Uses gsap.quickTo (transform-only), and caches the rect on enter
 * so pointermove never forces layout.
 */
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    let rect = null;

    const enter = () => {
      rect = el.getBoundingClientRect();
    };
    const move = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const leave = () => {
      rect = null;
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
