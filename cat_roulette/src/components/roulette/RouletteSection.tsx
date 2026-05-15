import { WheelSection } from '@/types/roulette';

interface Props {
  section: WheelSection;
  cx: number;
  cy: number;
  r: number;
  textRadius: number;
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function buildArcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

export default function RouletteSection({
  section,
  cx,
  cy,
  r,
  textRadius,
}: Props) {
  const midAngle = (section.startAngle + section.endAngle) / 2;
  const textPos = polarToCartesian(cx, cy, textRadius, midAngle);
  const pathD = buildArcPath(cx, cy, r, section.startAngle, section.endAngle);

  return (
    <g>
      <path
        d={pathD}
        fill={section.color}
        stroke="rgba(212,160,23,0.6)"
        strokeWidth="1.5"
      />
      <text
        x={textPos.x}
        y={textPos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={section.textColor}
        fontSize="18"
        fontWeight="bold"
        fontFamily="Georgia, serif"
        transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {section.label}
      </text>
    </g>
  );
}
