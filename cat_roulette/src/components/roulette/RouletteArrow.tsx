export default function RouletteArrow() {
  return (
    <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <svg
        width="36"
        height="52"
        viewBox="0 0 36 52"
        className="drop-shadow-[0_0_10px_rgba(212,160,23,0.9)]"
      >
        {/* Outer glow shape */}
        <polygon
          points="18,48 2,6 34,6"
          fill="rgba(212,160,23,0.2)"
          stroke="none"
          transform="scale(1.15) translate(-2.5, -3)"
        />
        {/* Main arrow body */}
        <polygon
          points="18,46 4,8 32,8"
          fill="#D4A017"
          stroke="#FFF8E1"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Inner highlight */}
        <polygon
          points="18,38 10,14 26,14"
          fill="rgba(255,248,225,0.3)"
          stroke="none"
        />
        {/* Arrow base circle */}
        <circle
          cx="18"
          cy="6"
          r="5"
          fill="#D4A017"
          stroke="#FFF8E1"
          strokeWidth="1.5"
        />
        <circle cx="18" cy="6" r="2.5" fill="#FFF8E1" opacity="0.9" />
      </svg>
    </div>
  );
}
