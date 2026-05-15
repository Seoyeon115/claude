'use client';

interface Props {
  currentCount: number;
  onChange: (count: number) => void;
  disabled: boolean;
}

const PRESETS = [4, 6, 8, 10, 12, 16];

export default function SectionConfig({ currentCount, onChange, disabled }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className="text-sm tracking-widest uppercase"
        style={{ color: '#8B6914', fontFamily: 'Georgia, serif' }}
      >
        Sections
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {PRESETS.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            disabled={disabled}
            className={`
              w-11 h-11 rounded-lg font-bold text-sm tracking-wider transition-all duration-200
              ${
                currentCount === n
                  ? 'bg-[#D4A017] text-[#1A0A00] border-2 border-[#F0C040]'
                  : 'bg-[#1A1A1A] text-[#8B6914] border-2 border-[#2A2A2A] hover:border-[#D4A017] hover:text-[#D4A017]'
              }
              ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
