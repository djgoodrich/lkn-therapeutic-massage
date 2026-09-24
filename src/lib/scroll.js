/**
 * Shared handle to the Lenis instance so any component can do
 * inertial anchor navigation without prop-drilling.
 */
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export function scrollToId(id, opts = {}) {
  const el = typeof id === 'string' ? document.getElementById(id.replace('#', '')) : id;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: opts.offset ?? 0,
      duration: opts.duration ?? 1.8,
      easing: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2),
    });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
