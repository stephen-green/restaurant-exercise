/*
 * A measure of how "good" or "bad" each value is in a list of values
 */
export class Metric {
  #key: symbol;
  #name: string;
  #normalizer: MetricNormalizer;
  
  constructor(normalizer: MetricNormalizer, name = '') {
    this.#key = Symbol();
    this.#name = name;
    this.#normalizer = normalizer;
  }
  
  /*
   * A unique lookup key that can be used to index this metric
   */
  get key(): symbol {
    return this.#key;
  }
  
  /*
   * The human-readable title of this metric
   */
  get name(): string {
    return this.#name;
  }
  
  /*
   * Applies this metric to a range of values, normalizing them on a scale from 0 (bad) to 1 (good)
   */
  normalize(range: number[]): number[] {
    return this.#normalizer.normalize(range);
  }
}
