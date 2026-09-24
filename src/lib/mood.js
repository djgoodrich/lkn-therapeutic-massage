/**
 * Mood engine — one tiny shared store that drives the whole site's palette.
 *
 * - `setMood(id)` sets a target palette.
 * - A single rAF loop eases `moodState.current` toward the target and writes
 *   CSS custom properties (as "r g b" triplets) so Tailwind classes like
 *   `text-mood-accent/80` re-tint instantly.
 * - WebGL layers read `moodState.current` (0–1 floats) every frame, so there
 *   is no React re-render on colour change and no layout work at all.
 */

export const MOODS = {
  rest: {
    label: 'Balance',
    a: '#5C2E32', // wine
    b: '#2A364E', // midnight
    light: '#C4A574', // antique gold
    accent: '#C4A574',
  },
  stress: {
    label: 'Stress Relief',
    a: '#2A364E',
    b: '#6D7FA8',
    light: '#E4D9C6',
    accent: '#C9BFA6',
  },
  deep: {
    label: 'Deep Tissue',
    a: '#5C2E32',
    b: '#8E4B45',
    light: '#C4A574',
    accent: '#C4A574',
  },
  pain: {
    label: 'Pain Restoration',
    a: '#5E2A22',
    b: '#B26B3C',
    light: '#E8B676',
    accent: '#D9A266',
  },
  prenatal: {
    label: 'Prenatal',
    a: '#47303D',
    b: '#A98079',
    light: '#EED6C6',
    accent: '#DDB6A3',
  },
  esthetics: {
    label: 'Esthetics',
    a: '#24403F',
    b: '#7FA79C',
    light: '#EDE6D6',
    accent: '#B7D0C3',
  },
};

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const KEYS = ['a', 'b', 'light', 'accent'];

const toPalette = (id) => {
  const m = MOODS[id] || MOODS.rest;
  return KEYS.reduce((acc, k) => {
    acc[k] = hexToRgb(m[k]);
    return acc;
  }, {});
};

export const moodState = {
  id: 'rest',
  current: toPalette('rest'),
  target: toPalette('rest'),
};

const listeners = new Set();
export const subscribeMood = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

let raf = 0;
let last = 0;
let frame = 0;

const writeCssVars = () => {
  if (typeof document === 'undefined') return;
  const s = document.documentElement.style;
  for (const k of KEYS) {
    const c = moodState.current[k];
    s.setProperty(
      `--lkn-${k}`,
      `${Math.round(c[0] * 255)} ${Math.round(c[1] * 255)} ${Math.round(c[2] * 255)}`
    );
  }
};

const step = (now) => {
  const dt = Math.min(0.05, (now - (last || now)) / 1000);
  last = now;
  // Critically-damped-ish exponential ease; ~1.6s to settle.
  const k = 1 - Math.exp(-dt * 2.6);
  let delta = 0;
  for (const key of KEYS) {
    const c = moodState.current[key];
    const t = moodState.target[key];
    for (let i = 0; i < 3; i++) {
      const d = t[i] - c[i];
      c[i] += d * k;
      delta += Math.abs(d);
    }
  }
  // WebGL reads `current` every frame; the page-wide CSS variables only need
  // ~30fps (each write restyles the page), and one final write when settled.
  frame++;
  const settled = delta <= 0.002;
  if (settled || frame % 2 === 0) writeCssVars();
  if (!settled) {
    raf = requestAnimationFrame(step);
  } else {
    raf = 0;
    last = 0;
  }
};

export function setMood(id) {
  if (!MOODS[id] || id === moodState.id) return;
  moodState.id = id;
  moodState.target = toPalette(id);
  listeners.forEach((fn) => fn(id));
  if (!raf && typeof window !== 'undefined') raf = requestAnimationFrame(step);
}

export function initMoodVars() {
  writeCssVars();
}
