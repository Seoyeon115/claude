interface ColorPair {
  bg: string;
  text: string;
}

export const CASINO_COLORS: ColorPair[] = [
  { bg: '#C0392B', text: '#FFFFFF' }, // deep red
  { bg: '#1A1A2E', text: '#F0C040' }, // midnight navy / gold text
  { bg: '#27AE60', text: '#FFFFFF' }, // casino green
  { bg: '#2C3E50', text: '#E8D5B0' }, // charcoal / cream text
  { bg: '#8E44AD', text: '#FFFFFF' }, // purple
  { bg: '#16213E', text: '#E74C3C' }, // dark navy / red text
  { bg: '#D4A017', text: '#1A1A2E' }, // gold / dark text
  { bg: '#2980B9', text: '#FFFFFF' }, // royal blue
  { bg: '#E74C3C', text: '#FFFFFF' }, // crimson
  { bg: '#16A085', text: '#FFFFFF' }, // teal
  { bg: '#F39C12', text: '#1A1A2E' }, // amber / dark text
  { bg: '#6C3483', text: '#FFFFFF' }, // deep purple
];

export function getColorForIndex(index: number): ColorPair {
  return CASINO_COLORS[index % CASINO_COLORS.length];
}
