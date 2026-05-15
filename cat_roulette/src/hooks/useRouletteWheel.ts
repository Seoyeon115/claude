'use client';

import { useState, useCallback, useRef } from 'react';
import { RouletteConfig, SpinState } from '@/types/roulette';
import { buildSections, generateSpinTarget } from '@/lib/wheelMath';

const DEFAULT_SECTION_COUNT = 8;
const SPIN_DURATION_MS = 4500;
const SPIN_BUFFER_MS = 200;

export function useRouletteWheel() {
  const [config, setConfig] = useState<RouletteConfig>({
    sectionCount: DEFAULT_SECTION_COUNT,
    sections: buildSections(DEFAULT_SECTION_COUNT),
  });

  const [spinState, setSpinState] = useState<SpinState>({
    isSpinning: false,
    currentRotation: 0,
    targetRotation: 0,
    winner: null,
  });

  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateSectionCount = useCallback((count: number) => {
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
      spinTimeoutRef.current = null;
    }
    setConfig({ sectionCount: count, sections: buildSections(count) });
    setSpinState({
      isSpinning: false,
      currentRotation: 0,
      targetRotation: 0,
      winner: null,
    });
  }, []);

  const spin = useCallback(
    (currentSections = config.sections, currentRotation = spinState.currentRotation) => {
      if (spinState.isSpinning) return;

      const { targetRotation, winner } = generateSpinTarget(
        currentRotation,
        currentSections
      );

      setSpinState((prev) => ({
        ...prev,
        isSpinning: true,
        targetRotation,
        winner: null,
      }));

      // After animation completes, commit new rotation and reveal winner
      spinTimeoutRef.current = setTimeout(() => {
        setSpinState({
          isSpinning: false,
          currentRotation: targetRotation,
          targetRotation,
          winner,
        });
      }, SPIN_DURATION_MS + SPIN_BUFFER_MS);
    },
    [spinState, config.sections]
  );

  return { config, spinState, spin, updateSectionCount };
}
