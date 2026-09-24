'use client';

import { useRouter } from 'next/navigation';
import gsap from 'gsap';

/**
 * Internal link with a cinematic exit: the veil closes like a slow blink,
 * then the route changes. Falls back to a normal navigation for modified
 * clicks (new tab etc.) and reduced motion.
 */
export default function TransitionLink({ href, children, className = '', ...rest }) {
  const router = useRouter();

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const veil = document.getElementById('lkn-veil');
    if (!veil || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.preventDefault();
    router.prefetch(href);
    gsap.set(veil, { display: 'block', visibility: 'visible', animation: 'none' });
    gsap.fromTo(
      veil,
      { clipPath: 'inset(50% 0% 50% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.9,
        ease: 'expo.inOut',
        onComplete: () => router.push(href),
      }
    );
  };

  return (
    <a href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
