export interface WheelSection {
  id: number;
  label: string;
  color: string;
  textColor: string;
  startAngle: number; // degrees
  endAngle: number; // degrees
}

export interface SpinState {
  isSpinning: boolean;
  currentRotation: number; // total accumulated degrees (monotonically increasing)
  targetRotation: number;
  winner: WheelSection | null;
}

export interface RouletteConfig {
  sectionCount: number;
  sections: WheelSection[];
}
