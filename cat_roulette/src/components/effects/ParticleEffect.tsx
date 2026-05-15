'use client';

import { useParticles } from '@/hooks/useParticles';

interface Props {
  trigger: boolean;
}

export default function ParticleEffect({ trigger }: Props) {
  const particles = useParticles(trigger);

  if (particles.length === 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              '--dx': p.dx,
              '--dy': p.dy,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              transform: `translate(-50%, -50%)`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
