'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { WheelSection } from '@/types/roulette';

interface Props {
  winner: WheelSection | null;
}

export default function ResultDisplay({ winner }: Props) {
  return (
    <div className="h-24 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {winner && (
          <motion.div
            key={winner.id + '-' + winner.label}
            initial={{ scale: 0.4, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.4, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="flex flex-col items-center gap-1"
          >
            <p
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: '#8B6914', fontFamily: 'Georgia, serif' }}
            >
              Winner
            </p>
            <motion.div
              initial={{ boxShadow: '0 0 0 rgba(212,160,23,0)' }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(212,160,23,0.8)',
                  '0 0 40px rgba(212,160,23,0.4)',
                  '0 0 20px rgba(212,160,23,0.8)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="px-10 py-3 rounded-xl border-2 border-[#D4A017]"
              style={{
                backgroundColor: winner.color,
                color: winner.textColor,
              }}
            >
              <span
                className="text-4xl font-bold tracking-wider"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {winner.label}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
