'use client';

import { useRouletteWheel } from '@/hooks/useRouletteWheel';
import RouletteWheel from '@/components/roulette/RouletteWheel';
import RouletteArrow from '@/components/roulette/RouletteArrow';
import SpinButton from '@/components/roulette/SpinButton';
import SectionConfig from '@/components/config/SectionConfig';
import ResultDisplay from '@/components/result/ResultDisplay';
import ParticleEffect from '@/components/effects/ParticleEffect';

export default function Home() {
  const { config, spinState, spin, updateSectionCount } = useRouletteWheel();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-8 py-12 px-4"
      style={{
        background:
          'radial-gradient(ellipse at center, #1A0A00 0%, #0D0D0D 60%, #000000 100%)',
      }}
    >
      {/* Decorative top border */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, #D4A017, #F0C040, #D4A017, transparent)',
        }}
      />

      {/* Title */}
      <div className="text-center">
        <h1
          className="casino-title text-5xl md:text-6xl font-bold tracking-[0.2em] uppercase mb-1"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Casino Roulette
        </h1>
        <p
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: '#4A3A10' }}
        >
          ✦ Spin the Wheel of Fortune ✦
        </p>
      </div>

      {/* Wheel area */}
      <div className="relative flex items-center justify-center">
        {/* Outer decorative ring glow */}
        <div
          className="absolute w-[440px] h-[440px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, transparent 45%, rgba(212,160,23,0.08) 70%, transparent 100%)',
          }}
        />

        {/* Arrow pointer */}
        <RouletteArrow />

        {/* Spinning wheel */}
        <RouletteWheel sections={config.sections} spinState={spinState} />

        {/* Particle effect on win */}
        <ParticleEffect trigger={spinState.winner !== null} />
      </div>

      {/* Spin button */}
      <SpinButton onSpin={spin} isSpinning={spinState.isSpinning} />

      {/* Result display */}
      <ResultDisplay winner={spinState.winner} />

      {/* Section count config */}
      <div
        className="border rounded-xl px-8 py-4"
        style={{
          borderColor: 'rgba(212,160,23,0.2)',
          background: 'rgba(26,10,0,0.6)',
        }}
      >
        <SectionConfig
          currentCount={config.sectionCount}
          onChange={updateSectionCount}
          disabled={spinState.isSpinning}
        />
      </div>

      {/* Decorative bottom border */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, #D4A017, #F0C040, #D4A017, transparent)',
        }}
      />
    </main>
  );
}
