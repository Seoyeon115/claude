'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { WheelSection, SpinState } from '@/types/roulette';
import RouletteSection from './RouletteSection';

interface Props {
  sections: WheelSection[];
  spinState: SpinState;
}

const CX = 200;
const CY = 200;
const OUTER_R = 182;
const TEXT_R = 130;
const SPIN_DURATION = 4.5;

// Custom cubic-bezier: fast burst → dramatic ease-out (casino physics)
const SPIN_EASE: [number, number, number, number] = [0.12, 0.8, 0.2, 1.0];

export default function RouletteWheel({ sections, spinState }: Props) {
  // useMotionValue로 회전값 관리 → animate 함수로 직접 제어
  const rotation = useMotionValue(0);

  // 스핀 시작 시 애니메이션 실행
  useEffect(() => {
    if (spinState.isSpinning) {
      animate(rotation, spinState.targetRotation, {
        duration: SPIN_DURATION,
        ease: SPIN_EASE,
      });
    }
  }, [spinState.isSpinning, spinState.targetRotation, rotation]);

  // 등분 수 변경 등으로 리셋될 때 동기화
  useEffect(() => {
    if (!spinState.isSpinning) {
      rotation.set(spinState.currentRotation);
    }
  }, [spinState.currentRotation, spinState.isSpinning, rotation]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle, transparent 55%, rgba(212,160,23,0.15) 80%, transparent 100%)',
          animation: spinState.isSpinning
            ? 'pulse-glow 0.8s ease-in-out infinite alternate'
            : undefined,
        }}
      />

      <motion.div
        style={{ rotate: rotation }}
        className="w-[400px] h-[400px]"
      >
        <svg
          viewBox="0 0 400 400"
          width="400"
          height="400"
          className="drop-shadow-[0_0_24px_rgba(212,160,23,0.35)]"
        >
          {/* Outermost decorative border ring */}
          <circle
            cx={CX}
            cy={CY}
            r={196}
            fill="none"
            stroke="#D4A017"
            strokeWidth="2"
            opacity="0.6"
          />
          <circle
            cx={CX}
            cy={CY}
            r={193}
            fill="#1A0A00"
            stroke="#8B6914"
            strokeWidth="1"
          />

          {/* Wheel background */}
          <circle cx={CX} cy={CY} r={OUTER_R} fill="#0D0D0D" />

          {/* Sections */}
          {sections.map((section) => (
            <RouletteSection
              key={section.id}
              section={section}
              cx={CX}
              cy={CY}
              r={OUTER_R}
              textRadius={TEXT_R}
            />
          ))}

          {/* Decorative rim dots */}
          {Array.from({ length: sections.length * 2 }, (_, i) => {
            const angle = (360 / (sections.length * 2)) * i;
            const rad = ((angle - 90) * Math.PI) / 180;
            const dotR = 187;
            return (
              <circle
                key={i}
                cx={CX + dotR * Math.cos(rad)}
                cy={CY + dotR * Math.sin(rad)}
                r="3"
                fill="#D4A017"
                opacity="0.8"
              />
            );
          })}

          {/* Inner hub ring */}
          <circle
            cx={CX}
            cy={CY}
            r={28}
            fill="#0D0D0D"
            stroke="#D4A017"
            strokeWidth="3"
          />
          <circle
            cx={CX}
            cy={CY}
            r={18}
            fill="#1A1A1A"
            stroke="#8B6914"
            strokeWidth="1.5"
          />
          {/* Center gem */}
          <circle cx={CX} cy={CY} r={8} fill="#D4A017" />
          <circle cx={CX} cy={CY} r={4} fill="#FFF8E1" opacity="0.9" />
        </svg>
      </motion.div>
    </div>
  );
}
