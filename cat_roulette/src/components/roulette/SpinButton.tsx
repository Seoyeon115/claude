'use client';

import { motion } from 'framer-motion';

interface Props {
  onSpin: () => void;
  isSpinning: boolean;
}

export default function SpinButton({ onSpin, isSpinning }: Props) {
  return (
    <motion.button
      onClick={onSpin}
      disabled={isSpinning}
      whileHover={!isSpinning ? { scale: 1.06 } : undefined}
      whileTap={!isSpinning ? { scale: 0.95 } : undefined}
      className={`
        relative px-14 py-4 rounded-full font-bold text-xl tracking-widest uppercase
        transition-all duration-300 select-none
        ${
          isSpinning
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed border-2 border-gray-600'
            : 'bg-gradient-to-r from-[#D4A017] via-[#F0C040] to-[#D4A017] text-[#1A0A00] border-2 border-[#F0C040] cursor-pointer'
        }
      `}
      style={
        !isSpinning
          ? {
              boxShadow:
                '0 0 20px rgba(212,160,23,0.6), 0 0 40px rgba(212,160,23,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
              fontFamily: 'Georgia, serif',
            }
          : { fontFamily: 'Georgia, serif' }
      }
    >
      {isSpinning ? (
        <span className="flex items-center gap-3">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block w-5 h-5 border-2 border-gray-500 border-t-gray-300 rounded-full"
          />
          Spinning...
        </span>
      ) : (
        'SPIN'
      )}
    </motion.button>
  );
}
