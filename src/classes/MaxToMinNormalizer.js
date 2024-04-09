import { MinToMaxNormalizer } from './MinToMaxNormalizer.js'

export class MaxToMinNormalizer extends MinToMaxNormalizer {
  getBest(range: number[]) {
    return Math.min(...range);
  }
  
  getWorst(range: number[]) {
    return Math.max(...range);
  }
}
