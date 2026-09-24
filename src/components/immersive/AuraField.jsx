'use client';

import { useEffect, useRef } from 'react';
import { moodState } from '../../lib/mood';

/**
 * AuraField — fixed, full-viewport WebGL aura.
 *
 * Raw WebGL (no three.js) with a single full-screen triangle. Rendered at
 * reduced resolution (the image is intentionally soft) and upscaled by CSS,
 * so the fragment cost stays tiny even on 4K displays.
 *
 * Cursor → energy: one aura body follows the pointer with heavy inertia,
 * two others drift on slow orbits. Everything "breathes" on an ~11s cycle
 * (≈5.5 breaths / minute — resonant, parasympathetic breathing pace).
 */

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uScroll;
uniform float uEnergy;
uniform vec3  uA;
uniform vec3  uB;
uniform vec3  uLight;

// --- 3D simplex noise (Ashima / Stefan Gustavson, MIT) ---
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float blob(vec2 p, vec2 c, float r){ vec2 d = p - c; return exp(-dot(d,d) / (r*r)); }

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.045;
  float breath = 0.5 + 0.5 * sin(uTime * 0.571);           // ~11s cycle

  // Domain warp: organic, smoke-like edges.
  vec2 w = vec2(snoise(vec3(p * 1.1, t)), snoise(vec3(p * 1.1 + 4.7, t + 2.3)));
  vec2 q = p + 0.32 * w;

  float sy = uScroll * 0.35;
  vec2 c1 = uMouse;
  vec2 c2 = vec2( 0.55 + 0.25 * sin(t * 2.3),  0.10 + 0.22 * cos(t * 1.7) + sy);
  vec2 c3 = vec2(-0.65 + 0.22 * cos(t * 1.4), -0.20 + 0.25 * sin(t * 2.1) + sy * 0.6);

  float f1 = blob(q, c1, 0.42 + 0.06 * breath + 0.1 * uEnergy);
  float f2 = blob(q, c2, 0.78 + 0.05 * breath);
  float f3 = blob(q, c3, 0.70);

  vec3 ink = vec3(0.047, 0.063, 0.094);                     // #0C1018
  vec3 col = ink;
  col = mix(col, uB * 0.85, f3 * 0.55);
  col = mix(col, uA * 1.05, f2 * 0.70);
  col += uLight * f1 * (0.10 + 0.05 * breath + 0.10 * uEnergy);

  // Faint energy filaments flowing through the aura bodies.
  float fil = snoise(vec3(q * 3.0, t * 2.0));
  col += uLight * smoothstep(0.02, 0.0, abs(fil)) * 0.05 * (f1 + f2 * 0.6);

  // Vignette to keep type legible at the edges.
  vec2 uv = gl_FragCoord.xy / uRes;
  float vig = 1.0 - smoothstep(0.25, 1.25, length((uv - 0.5) * vec2(1.25, 1.0)));
  col = mix(ink * 0.6, col, 0.35 + 0.65 * vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

const RES_SCALE = 0.42; // aura is soft by design — render small, upscale via CSS

export default function AuraField() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // A fresh canvas per mount: React StrictMode (dev) mounts effects twice,
    // and a canvas whose context was released can never be reused — it would
    // paint solid white. Owning the element here keeps every mount clean.
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
    host.appendChild(canvas);

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      canvas.remove();
      return;
    }
    // If the GPU drops the context (driver reset, tab backgrounded on mobile),
    // hide the canvas so the dark page background shows instead of white.
    const onLost = (e) => {
      e.preventDefault();
      canvas.style.visibility = 'hidden';
    };
    canvas.addEventListener('webglcontextlost', onLost);

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('[AuraField]', gl.getShaderInfoLog(s));
      }
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // One oversized triangle covers the viewport (no diagonal seam, 3 verts).
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes');
    const uTime = u('uTime');
    const uMouse = u('uMouse');
    const uScroll = u('uScroll');
    const uEnergy = u('uEnergy');
    const uA = u('uA');
    const uB = u('uB');
    const uLight = u('uLight');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const w = Math.max(1, Math.round(W * RES_SCALE));
      const h = Math.max(1, Math.round(H * RES_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    resize();

    // Pointer, in the shader's aspect-corrected space. Written by events,
    // consumed by rAF — events never touch the GPU or the DOM.
    const target = { x: 0.35, y: 0.05 };
    const mouse = { x: 0.35, y: 0.05 };
    let energy = 0;
    let lastPX = 0;
    let lastPY = 0;
    const onMove = (e) => {
      target.x = (e.clientX - W * 0.5) / H;
      target.y = (H * 0.5 - e.clientY) / H;
      const v = Math.hypot(e.clientX - lastPX, e.clientY - lastPY);
      lastPX = e.clientX;
      lastPY = e.clientY;
      energy = Math.min(1, energy + v * 0.0025);
    };

    let scrollN = 0;
    const onScroll = () => {
      scrollN = window.scrollY / Math.max(1, H);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);

    let raf = 0;
    let running = true;
    let t0 = performance.now();
    let last = t0;
    let time = 0;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += reduced ? 0 : dt;

      const k = 1 - Math.exp(-dt * 1.4); // heavy, inertial follow
      mouse.x += (target.x - mouse.x) * k;
      mouse.y += (target.y - mouse.y) * k;
      energy *= Math.exp(-dt * 1.2);

      const c = moodState.current;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, Math.min(scrollN, 6));
      gl.uniform1f(uEnergy, energy);
      gl.uniform3f(uA, c.a[0], c.a[1], c.a[2]);
      gl.uniform3f(uB, c.b[0], c.b[1], c.b[2]);
      gl.uniform3f(uLight, c.light[0], c.light[1], c.light[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const start = () => {
      if (running && raf) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      canvas.removeEventListener('webglcontextlost', onLost);
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-ink"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
