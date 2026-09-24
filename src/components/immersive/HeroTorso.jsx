'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { moodState } from '../../lib/mood';

/* ------------------------------------------------------------------------- */
/*  Procedural torso geometry                                                */
/*  Built from a hand-tuned anatomical profile (not a stock model): each     */
/*  horizontal ring is a superellipse, sculpted with pectoral, scapular,     */
/*  clavicle and spinal landmarks, then seeded jitter gives it a carved,      */
/*  faceted, hand-made feel.                                                  */
/* ------------------------------------------------------------------------- */

const HEIGHT = 2.8;
const BASE_Y = -1.4;

// [t, halfWidth, halfDepth, zOffset, superellipseN]
const PROFILE = [
  [0.0, 0.58, 0.39, 0.0, 2.6], // lower abdomen (fades out)
  [0.14, 0.52, 0.36, 0.0, 2.6], // waist
  [0.3, 0.58, 0.4, 0.01, 2.5], // lower ribs
  [0.46, 0.66, 0.45, 0.02, 2.4],
  [0.58, 0.74, 0.47, 0.02, 2.4], // chest
  [0.66, 0.81, 0.45, 0.01, 2.5], // lats / armpit
  [0.72, 0.87, 0.4, 0.0, 2.8], // deltoid
  [0.765, 0.8, 0.34, -0.02, 2.7], // top of the shoulder rounding over
  [0.8, 0.63, 0.29, -0.03, 2.4], // trapezius
  [0.835, 0.46, 0.26, -0.02, 2.2], // trapezius slope into the neck
  [0.87, 0.3, 0.24, 0.0, 2.0], // neck base
  [0.93, 0.23, 0.22, 0.03, 2.0],
  [1.0, 0.235, 0.235, 0.05, 2.0],
];

function sampleProfile(t) {
  // Cubic Hermite through non-uniform keys (finite-difference tangents).
  const K = PROFILE;
  let i = 0;
  while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const k0 = K[Math.max(0, i - 1)];
  const k1 = K[i];
  const k2 = K[i + 1];
  const k3 = K[Math.min(K.length - 1, i + 2)];
  const span = k2[0] - k1[0];
  const u = Math.min(1, Math.max(0, (t - k1[0]) / span));
  const u2 = u * u;
  const u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1;
  const h10 = u3 - 2 * u2 + u;
  const h01 = -2 * u3 + 3 * u2;
  const h11 = u3 - u2;
  const out = [];
  for (let c = 1; c < 5; c++) {
    const m1 = ((k2[c] - k0[c]) / Math.max(1e-4, k2[0] - k0[0])) * span;
    const m2 = ((k3[c] - k1[c]) / Math.max(1e-4, k3[0] - k1[0])) * span;
    out.push(h00 * k1[c] + h10 * m1 * 0.85 + h01 * k2[c] + h11 * m2 * 0.85);
  }
  return out; // [w, d, zOff, n]
}

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const gauss = (x, c, w) => Math.exp(-((x - c) * (x - c)) / (w * w));

function buildTorsoGeometry() {
  const RINGS = 34;
  const SEG = 22;
  const rand = mulberry32(1207);
  const pos = [];
  const ts = [];

  for (let r = 0; r <= RINGS; r++) {
    // Denser rings around the shoulder shelf, where the silhouette turns.
    const lin = r / RINGS;
    const t = lin + 0.035 * Math.sin(lin * Math.PI * 2 - 0.6);
    const [w, d, zOff, n] = sampleProfile(t);
    const y = BASE_Y + t * HEIGHT;
    const e = 2 / n;
    const torsoMask = 1 - Math.min(1, Math.max(0, (t - 0.8) / 0.06));

    for (let s = 0; s < SEG; s++) {
      const th = (s / SEG) * Math.PI * 2 + (r % 2) * (Math.PI / SEG); // staggered = triangular facets
      const c = Math.cos(th);
      const sn = Math.sin(th);
      let x = w * Math.sign(c) * Math.pow(Math.abs(c), e);
      let z = d * Math.sign(sn) * Math.pow(Math.abs(sn), e);
      z *= sn > 0 ? 1.04 : 0.9; // fuller chest, flatter back
      z += zOff;

      const ax = Math.abs(x);
      if (sn > 0) {
        // Pectorals + upper abdominals + clavicle ridge
        z += 0.065 * gauss(ax, 0.3, 0.2) * gauss(t, 0.62, 0.07) * torsoMask;
        z += 0.03 * gauss(ax, 0.12, 0.14) * gauss(t, 0.3, 0.12);
        z += 0.03 * gauss(t, 0.785, 0.02) * (ax > 0.08 && ax < 0.6 ? 1 : 0);
        // Sternocleidomastoid hint on the neck
        z += 0.018 * gauss(ax, 0.1, 0.06) * gauss(t, 0.91, 0.04);
      } else {
        // Scapulae + spinal groove + erectors
        z -= 0.055 * gauss(ax, 0.33, 0.16) * gauss(t, 0.66, 0.08) * torsoMask;
        z += 0.03 * gauss(ax, 0.0, 0.06) * gauss(t, 0.45, 0.3);
        z -= 0.02 * gauss(ax, 0.13, 0.06) * gauss(t, 0.3, 0.18);
      }
      // Latissimus flare
      x += Math.sign(x) * 0.03 * gauss(t, 0.55, 0.1) * Math.abs(c);

      // Carved jitter (radial), less on the neck to keep it clean
      const j = (rand() - 0.5) * (t > 0.84 ? 0.008 : 0.022);
      const len = Math.hypot(x, z - zOff) || 1;
      x += (x / len) * j;
      z += ((z - zOff) / len) * j;

      pos.push(x, y, z);
      ts.push(t);
    }
  }

  // Caps
  const bottomIndex = pos.length / 3;
  pos.push(0, BASE_Y, 0);
  ts.push(0);
  const topIndex = pos.length / 3;
  const [, , zTop] = sampleProfile(1);
  pos.push(0, BASE_Y + HEIGHT + 0.06, zTop);
  ts.push(1);

  const idx = [];
  for (let r = 0; r < RINGS; r++) {
    for (let s = 0; s < SEG; s++) {
      const a = r * SEG + s;
      const b = r * SEG + ((s + 1) % SEG);
      const c = (r + 1) * SEG + s;
      const dIdx = (r + 1) * SEG + ((s + 1) % SEG);
      if (r % 2 === 0) {
        idx.push(a, c, b, b, c, dIdx);
      } else {
        idx.push(a, c, dIdx, a, dIdx, b);
      }
    }
  }
  for (let s = 0; s < SEG; s++) {
    idx.push(bottomIndex, s, (s + 1) % SEG);
    const a = RINGS * SEG + s;
    const b = RINGS * SEG + ((s + 1) % SEG);
    idx.push(a, topIndex, b);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aT', new THREE.Float32BufferAttribute(ts, 1));
  g.setIndex(idx);

  // Non-indexed so every triangle owns its vertices → barycentric edges +
  // truly flat facets after deformation.
  const flat = g.toNonIndexed();
  g.dispose();
  const count = flat.attributes.position.count;
  const bary = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) bary[i * 3 + (i % 3)] = 1;
  flat.setAttribute('aBary', new THREE.BufferAttribute(bary, 3));
  flat.computeBoundingSphere();
  return flat;
}

/* ------------------------------------------------------------------------- */
/*  Shaders                                                                  */
/* ------------------------------------------------------------------------- */

const KNOTS = [
  new THREE.Vector3(0.38, 0.84, -0.18), // upper trapezius L/R
  new THREE.Vector3(-0.38, 0.84, -0.18),
  new THREE.Vector3(0.16, 1.0, -0.2), // levator scapulae
  new THREE.Vector3(-0.13, 1.12, 0.22), // sternocleidomastoid
  new THREE.Vector3(0.2, 0.38, -0.44), // rhomboids
  new THREE.Vector3(-0.3, -0.78, -0.33), // quadratus lumborum
];

const torsoVert = /* glsl */ `
uniform float uTime;
uniform float uRelease;
uniform float uUnwind;
uniform float uBreath;
uniform float uTremor;
uniform vec3  uKnots[6];

attribute float aT;
attribute vec3  aBary;

varying vec3  vWorld;
varying vec3  vRest;
varying vec3  vBary;
varying float vT;
varying float vKnot;
varying float vTight;

float bell(float x, float c, float w){ float d = (x - c) / w; return exp(-d * d); }

void main(){
  vec3 p = position;
  float tension  = clamp(1.0 - uRelease, 0.0, 1.0);
  float residual = (1.0 - uUnwind) * 0.2 * uRelease;
  float tight    = tension + residual;

  float kn = 0.0;
  for (int i = 0; i < 6; i++) {
    vec3 d = p - uKnots[i];
    kn += exp(-dot(d, d) / 0.02);
  }
  kn = min(kn, 1.0);

  vec2 rad = normalize(p.xz + vec2(1e-4));

  // Breath — ribcage expands, shoulders float.
  p.xz += rad * uBreath * 0.032 * bell(aT, 0.56, 0.2);
  p.y  += uBreath * 0.022 * smoothstep(0.5, 0.85, aT);

  // Knots swell while the body is guarded.
  p.xz += rad * kn * 0.05 * tight;

  // Guarding posture: shoulders up toward the ears, rolled forward, narrowed.
  float sh = smoothstep(0.6, 0.78, aT) * (1.0 - 0.55 * smoothstep(0.86, 1.0, aT));
  p.y += tight * 0.2 * sh;
  p.z += tight * 0.1 * sh * smoothstep(0.35, 0.85, abs(p.x));
  p.x *= 1.0 - tight * 0.07 * sh;
  p.z += tight * 0.14 * smoothstep(0.82, 1.0, aT);          // forward head

  // Compression → lengthening, anchored at the base.
  float len = mix(0.86, 1.0, uRelease) + uUnwind * 0.05;
  p.y = (p.y + 1.4) * len - 1.4;

  // Spiral holding pattern that unwinds.
  float tw = tight * 0.34 * (aT - 0.25);
  float c = cos(tw), s = sin(tw);
  p.xz = mat2(c, -s, s, c) * p.xz;

  // Held-breath micro tremor.
  p += uTremor * 0.0045 * vec3(sin(uTime * 23.0 + aT * 40.0), sin(uTime * 17.0 + aT * 29.0), 0.0);

  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  vRest  = position;
  vBary  = aBary;
  vT     = aT;
  vKnot  = kn;
  vTight = tight;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const torsoFrag = /* glsl */ `
uniform float uTime;
uniform vec3  uA;
uniform vec3  uB;
uniform vec3  uLight;
uniform vec4  uPulses[4];   // xyz = origin (rest space), w = start time
uniform float uPulseAmp[4];
uniform float uReveal;

varying vec3  vWorld;
varying vec3  vRest;
varying vec3  vBary;
varying float vT;
varying float vKnot;
varying float vTight;

void main(){
  // Faceted normal from screen-space derivatives → true low-poly shading
  // that stays correct after vertex deformation.
  vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  vec3 V = normalize(cameraPosition - vWorld);
  if (dot(N, V) < 0.0) N = -N;

  vec3 L1 = normalize(vec3(-0.55, 0.75, 0.65));   // key
  vec3 L2 = normalize(vec3(0.85, 0.25, -0.55));   // back rim
  float wrap = max((dot(N, L1) + 0.4) / 1.4, 0.0);
  float back = max(dot(N, L2), 0.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.2);

  vec3 skin = vec3(0.062, 0.066, 0.082);
  vec3 col = skin * (0.35 + 0.95 * wrap);
  col += uA * 0.22 * wrap;
  col += uB * 0.32 * back;
  col += uLight * fres * 0.38;
  vec3 H = normalize(L1 + V);
  col += uLight * pow(max(dot(N, H), 0.0), 48.0) * 0.18;

  // Light travelling through tissue: expanding shells from pulse origins.
  float glow = 0.0;
  for (int i = 0; i < 4; i++) {
    float age = uTime - uPulses[i].w;
    if (age > 0.0 && age < 6.0) {
      float r = age * 0.72;
      float d = length(vRest - uPulses[i].xyz);
      float band = exp(-pow((d - r) / 0.18, 2.0));
      float inner = exp(-pow((d - r * 0.6) / 0.5, 2.0)) * 0.25;
      glow += (band + inner) * uPulseAmp[i] * (1.0 - age / 6.0);
    }
  }

  // Facet edges read as fibres; they catch the travelling light.
  vec3 fw = fwidth(vBary);
  vec3 a3 = smoothstep(vec3(0.0), fw * 1.3, vBary);
  float edge = 1.0 - min(min(a3.x, a3.y), a3.z);

  vec3 warm = mix(uLight, vec3(1.0, 0.92, 0.78), 0.25);
  glow = min(glow, 1.2);
  col += uLight * edge * (0.04 + 0.42 * glow);
  col += warm * glow * (0.25 + 0.75 * fres) * 0.5;

  // Trigger points smoulder while the body is guarded.
  float kg = vKnot * vTight * (0.65 + 0.35 * sin(uTime * 2.1));
  col += (vec3(0.62, 0.18, 0.16) * 0.7 + uA * 0.5) * kg * 0.6;

  // Both cut ends dissolve, so it reads as a living volume, not a bust on a stand.
  float alpha = smoothstep(0.0, 0.24, vT) * (1.0 - 0.9 * smoothstep(0.9, 1.0, vT)) * uReveal;
  gl_FragColor = vec4(col, alpha);
}
`;

const motesVert = /* glsl */ `
uniform float uTime;
uniform float uRelease;
uniform float uPixel;
attribute vec3 aSeed;
varying float vA;
void main(){
  float h = fract(aSeed.y + uTime * (0.012 + 0.02 * aSeed.z) * (0.4 + uRelease));
  float ang = aSeed.x * 6.2831 + uTime * 0.05 * (aSeed.z - 0.5);
  float rad = 0.95 + aSeed.z * 1.1;
  vec3 p = vec3(cos(ang) * rad, -1.4 + h * 3.2, sin(ang) * rad * 0.7);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uPixel * (1.2 + aSeed.z * 2.2) * (6.0 / -mv.z);
  vA = sin(h * 3.14159) * (0.15 + 0.6 * uRelease);
}
`;

const motesFrag = /* glsl */ `
uniform vec3 uLight;
varying float vA;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uLight, a * a * vA);
}
`;

/* ------------------------------------------------------------------------- */

const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;

const HOLD = 0.9; // seconds held tight before the exhale
const EXHALE = 4.0; // seconds

export default function HeroTorso({ onProgress, onUnwound }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const cbRef = useRef({ onProgress, onUnwound });
  cbRef.current = { onProgress, onUnwound };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      wrap.dataset.fallback = 'true';
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
    camera.position.set(0, 0.15, 7.2);
    camera.lookAt(0, 0.05, 0);

    const stage = new THREE.Group(); // responsive placement
    const body = new THREE.Group(); // user rotation
    stage.add(body);
    scene.add(stage);

    const geometry = buildTorsoGeometry();
    const pulses = [0, 1, 2, 3].map(() => new THREE.Vector4(0, -9, 0, -99));
    const uniforms = {
      uTime: { value: 0 },
      uRelease: { value: reduced ? 1 : 0 },
      uUnwind: { value: 0 },
      uBreath: { value: 0 },
      uTremor: { value: 0 },
      uReveal: { value: reduced ? 1 : 0 },
      uKnots: { value: KNOTS },
      uA: { value: new THREE.Vector3() },
      uB: { value: new THREE.Vector3() },
      uLight: { value: new THREE.Vector3() },
      uPulses: { value: pulses },
      uPulseAmp: { value: [0, 0, 0, 0] },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: torsoVert,
      fragmentShader: torsoFrag,
      transparent: true,
      side: THREE.FrontSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    body.add(mesh);

    // Motes
    const MOTES = 180;
    const seeds = new Float32Array(MOTES * 3);
    const rnd = mulberry32(42);
    for (let i = 0; i < MOTES * 3; i++) seeds[i] = rnd();
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MOTES * 3), 3));
    moteGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));
    moteGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4);
    const moteMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: uniforms.uTime,
        uRelease: uniforms.uRelease,
        uLight: uniforms.uLight,
        uPixel: { value: dpr },
      },
      vertexShader: motesVert,
      fragmentShader: motesFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    stage.add(motes);

    let pulseCursor = 0;
    const firePulse = (x, y, z, amp, at) => {
      const p = pulses[pulseCursor];
      p.set(x, y, z, at);
      uniforms.uPulseAmp.value[pulseCursor] = amp;
      pulseCursor = (pulseCursor + 1) % pulses.length;
    };

    /* ---------------- layout ---------------- */
    let W = 1;
    let H = 1;
    const layout = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      const visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const visW = visH * camera.aspect;
      if (camera.aspect > 1.05) {
        stage.position.set(Math.min(1.5, visW * 0.2), -0.05, 0);
        stage.scale.setScalar(1);
      } else {
        stage.scale.setScalar(Math.min(0.95, visW / 2.1));
        stage.position.set(0, 0.62, 0);
      }
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);

    /* ---------------- interaction ---------------- */
    const BASE_YAW = -0.42;
    const rot = { yaw: 0, pitch: 0, vYaw: 0, vPitch: 0 };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let unwind = 0;
    let unwindReported = -1;
    let unwoundFired = false;
    let dragAccum = 0;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    let time = 0;
    let release = reduced ? 1 : 0;

    const onDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
      wrap.classList.add('is-dragging');
      // A touch sends light through the tissue from where it lands.
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObject(mesh, false)[0];
      if (hit) {
        const local = mesh.worldToLocal(hit.point.clone());
        firePulse(local.x, local.y, local.z, 0.9, time);
      }
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rot.vYaw += dx * 0.0042;
      rot.vPitch += dy * 0.0016;
      if (release > 0.85) {
        const d = Math.hypot(dx, dy);
        unwind = Math.min(1, unwind + d / (W * 2.6));
        dragAccum += d;
        if (dragAccum > 320) {
          dragAccum = 0;
          const k = KNOTS[Math.floor(Math.random() * KNOTS.length)];
          firePulse(k.x, k.y, k.z, 0.35 + 0.3 * (1 - unwind), time);
        }
      }
    };
    const onUp = (e) => {
      dragging = false;
      wrap.classList.remove('is-dragging');
      canvas.releasePointerCapture?.(e.pointerId);
    };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    /* ---------------- loop ---------------- */
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let nextAmbient = HOLD + EXHALE + 5;
    let exhaleFired = false;
    let secondFired = false;

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;
      uniforms.uTime.value = time;

      // Load choreography: held → 4s exhale.
      if (!reduced) {
        uniforms.uReveal.value = Math.min(1, time / 0.9);
        const x = Math.min(1, Math.max(0, (time - HOLD) / EXHALE));
        release = easeInOutSine(x);
        uniforms.uTremor.value = time < HOLD ? 1 : Math.max(0, 1 - (time - HOLD) * 1.5);
        if (!exhaleFired && time > HOLD) {
          exhaleFired = true;
          firePulse(0, -1.6, 0.05, 1.1, time);
        }
        if (!secondFired && time > HOLD + 1.8) {
          secondFired = true;
          firePulse(0, -1.2, 0.2, 0.7, time);
        }
        if (time > nextAmbient) {
          nextAmbient = time + 9;
          firePulse(0, -1.6, 0, 0.35 + 0.3 * unwind, time);
        }
      }
      uniforms.uRelease.value = release;

      // Breathing — deepens as the body lets go (≈6s cycle).
      const breathAmp = (reduced ? 0.2 : 1) * (0.25 + 0.75 * release) * (0.7 + 0.5 * unwind);
      uniforms.uBreath.value = Math.sin(time * 1.047) * breathAmp;

      // Unwind eases in smoothly even if drag input is jerky.
      uniforms.uUnwind.value += (unwind - uniforms.uUnwind.value) * (1 - Math.exp(-dt * 3));
      const u = uniforms.uUnwind.value;
      if (Math.abs(u - unwindReported) > 0.008) {
        unwindReported = u;
        cbRef.current.onProgress?.(u);
      }
      if (!unwoundFired && unwind >= 1) {
        unwoundFired = true;
        firePulse(0, 0.2, 0, 1.4, time);
        firePulse(0, 1.1, 0, 0.9, time + 0.4);
        cbRef.current.onUnwound?.();
      }

      // Inertial rotation + gentle idle sway.
      rot.yaw += rot.vYaw;
      rot.pitch += rot.vPitch;
      rot.vYaw *= Math.exp(-dt * 3.2);
      rot.vPitch *= Math.exp(-dt * 4);
      if (!dragging) {
        rot.pitch += (0 - rot.pitch) * (1 - Math.exp(-dt * 2));
      }
      rot.pitch = Math.max(-0.25, Math.min(0.25, rot.pitch));
      const sway = reduced ? 0 : Math.sin(time * 0.23) * 0.12;
      body.rotation.y = BASE_YAW + rot.yaw + sway;
      body.rotation.x = rot.pitch;

      const c = moodState.current;
      uniforms.uA.value.set(c.a[0], c.a[1], c.a[2]);
      uniforms.uB.value.set(c.b[0], c.b[1], c.b[2]);
      uniforms.uLight.value.set(c.light[0], c.light[1], c.light[2]);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        visible ? start() : stop();
      },
      { threshold: 0.01 }
    );
    io.observe(wrap);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      geometry.dispose();
      material.dispose();
      moteGeo.dispose();
      moteMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="lkn-torso absolute inset-0" data-cursor="Drag">
      <canvas
        ref={canvasRef}
        aria-label="Interactive sculpture of a torso. Drag to rotate it and help it unwind."
        role="img"
        className="block h-full w-full touch-pan-y"
      />
    </div>
  );
}
