import { MetricNormalizer } from './MetricNormalizer.js'

/*
 * 0 = (worst, furthest from target), 1 = (best, right on target)
 */
export class AbsoluteValueNormalizer implements MetricNormalizer {
  normalize(range: number[]): number[] {
    var best = Math.min(...range.map(x => Math.abs(x)));
    var worst = Math.max(...range.map(x => Math.abs(x)));
    var span = best - worst;
    if (span) {
      return range.map(value => (Math.abs(value) - worst) / span);
    } else {
      return range.map(original => 1);
    }
  }
}
