/**
 * Join conditional class names. Falsy values are dropped.
 * cn('a', cond && 'b', cond ? 'c' : 'd')
 */
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(' ');
}

/** easeOutExpo, as a cubic-bezier array for Framer Motion. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
