'use client';

import { useEffect, useState } from 'react';

export interface Particle {
  id: number;
  x: number;
  y: number;
  dx: string;
  dy: string;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const PARTICLE_COLORS = [
  '#D4A017', '#F0C040', '#E74C3C', '#27AE60',
  '#2980B9', '#8E44AD', '#FFFFFF', '#F39C12',
];

export function useParticles(trigger: boolean, count = 24): Particle[] {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (360 / count) * i + Math.random() * 20 - 10;
      const distance = 80 + Math.random() * 120;
      const rad = (angle * Math.PI) / 180;
      const dx = `${(Math.cos(rad) * distance).toFixed(1)}px`;
      const dy = `${(Math.sin(rad) * distance).toFixed(1)}px`;

      return {
        id: i,
        x: 0,
        y: 0,
        dx,
        dy,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        size: 6 + Math.random() * 6,
        duration: 0.8 + Math.random() * 0.6,
        delay: Math.random() * 0.15,
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timer);
  }, [trigger, count]);

  return particles;
}
