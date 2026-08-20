'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

export default function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const startSoundscape = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Warm soothing harmonic frequencies (gentle 432Hz rooted ambient triad)
      const freqs = [108, 162, 216, 432];
      const oscs = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low volume for gentle background pad
        const level = idx === 0 ? 0.08 : idx === 1 ? 0.05 : 0.03;
        oscGain.gain.setValueAtTime(level, ctx.currentTime);

        // Subtle slow lfo modulation for soothing breath-like swell
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext not allowed without user interaction:', e);
    }
  };

  const stopSoundscape = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
      oscillatorsRef.current = [];
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="flex items-center space-x-2 bg-moody-900/90 backdrop-blur-md border border-gold-400/30 p-2 sm:px-3 sm:py-2 rounded-full shadow-2xl">
        <button
          onClick={toggleAudio}
          className={`p-2 rounded-full transition-colors flex items-center space-x-1.5 text-xs ${
            isPlaying
              ? 'bg-gold-500 text-moody-950 font-bold animate-pulse'
              : 'bg-moody-800 text-gold-300 hover:bg-moody-700'
          }`}
          title={isPlaying ? 'Pause Spa Sanctuary Ambience' : 'Play Spa Sanctuary Ambience'}
          aria-label="Toggle spa sanctuary ambience audio"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-semibold">
            {isPlaying ? 'Ambience On' : 'Spa Ambience'}
          </span>
        </button>
      </div>
    </div>
  );
}
