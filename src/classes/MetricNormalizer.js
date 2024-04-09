export interface MetricNormalizer {
  /*
   * Applies this metric to a range of values, normalizing them on a scale from 0 (bad) to 1 (good)
   */
  normalize(range: number[]): number[];
}
