import { WheelSection } from '@/types/roulette';
import { getColorForIndex } from './casinoColors';

/** Build sections array from a count */
export function buildSections(count: number): WheelSection[] {
  const sliceDeg = 360 / count;
  return Array.from({ length: count }, (_, i) => {
    const color = getColorForIndex(i);
    return {
      id: i,
      label: String(i + 1),
      color: color.bg,
      textColor: color.text,
      startAngle: i * sliceDeg,
      endAngle: (i + 1) * sliceDeg,
    };
  });
}

/**
 * Given total accumulated rotation (degrees), determine the winning section.
 * The pointer is fixed at the top (0°).
 * After rotation, the section under the pointer is at:
 *   pointerAngle = (360 - totalRotation % 360) % 360
 */
export function calculateWinner(
  sections: WheelSection[],
  totalRotation: number
): WheelSection {
  const normalized = ((totalRotation % 360) + 360) % 360;
  const pointerAngle = (360 - normalized) % 360;
  return (
    sections.find(
      (s) => pointerAngle >= s.startAngle && pointerAngle < s.endAngle
    ) ?? sections[0]
  );
}

const MIN_ROTATIONS = 5;
const MAX_EXTRA_ROTATIONS = 3;

/**
 * Generate a random spin target rotation.
 * - At least MIN_ROTATIONS full spins from current position
 * - Lands at a random position within a random section
 * - Returns monotonically increasing targetRotation for smooth animation
 */
export function generateSpinTarget(
  currentRotation: number,
  sections: WheelSection[]
): { targetRotation: number; winner: WheelSection } {
  const sliceDeg = 360 / sections.length;
  const extraSpins =
    (MIN_ROTATIONS + Math.random() * MAX_EXTRA_ROTATIONS) * 360;

  // Pick a random winner section
  const winnerIndex = Math.floor(Math.random() * sections.length);
  // Land somewhere in the middle of the slice (avoid edges for visual clarity)
  const landingOffset = sliceDeg * 0.15 + Math.random() * sliceDeg * 0.7;
  const landingAngle = winnerIndex * sliceDeg + landingOffset;

  // We want the wheel to end up with landingAngle at the top (pointer position).
  // When wheel rotation = R, the angle at top = (360 - R % 360) % 360
  // We want: (360 - R % 360) % 360 = landingAngle
  //   => R % 360 = (360 - landingAngle) % 360
  const targetModulo = (360 - landingAngle + 360) % 360;
  const currentModulo = ((currentRotation % 360) + 360) % 360;

  // How many additional degrees to add on top of current rotation
  let addDegrees = targetModulo - currentModulo;
  if (addDegrees <= 0) addDegrees += 360;

  const targetRotation = currentRotation + extraSpins + addDegrees;
  const winner = sections[winnerIndex];

  return { targetRotation, winner };
}
