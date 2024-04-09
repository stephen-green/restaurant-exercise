import { MetricNormalizer } from './MetricNormalizer.js'

/*
 * 0 = (worst, furthest from target), 1 = (best, right on target)
 */
export class ErrorFromTargetNormalizer implements MetricNormalizer {
  #target: number;
  
  constructor(target: number) {
    this.#target = target;
  }
  
  normalize(range: number[]): number[] {
    let worstError = Math.max(...range.map(value => Math.abs(value - this.#target)));
    if (worstError) {
      return range.map(value => 1.0 - Math.abs(value - this.#target) / worstError);
    } else {
      return range.map(original => 1.0);
    }
  }
}
