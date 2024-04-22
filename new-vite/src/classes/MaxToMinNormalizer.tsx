import { MinToMaxNormalizer } from './MinToMaxNormalizer.tsx'

/*
 * 0 = (worst, highest value), 1 = (best, lowest value)
 */
export class MaxToMinNormalizer extends MinToMaxNormalizer {
  getBest(range: number[]): number {
    return Math.min(...range);
  }
  
  getWorst(range: number[]): number {
    return Math.max(...range);
  }
}
