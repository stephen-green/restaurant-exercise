import { MetricNormalizer } from './MetricNormalizer.js'

/*
 * 0 = (worst, lowest value), 1 = (best, highest value)
 */
export class MinToMaxNormalizer implements MetricNormalizer {
  normalize(range: number[]): number[] {
    var best = this.getBest(range);
    var worst = this.getWorst(range);
    var span = best - worst;
    if (span) {
      return range.map(value => (value - worst) / span);
    } else {
      return range.map(original => 1);
    }
  }
  
  getBest(range: number[]): number {
    return Math.max(...range);
  }
  
  getWorst(range: number[]): number {
    return Math.min(...range);
  }
}
