export class Metric {
  #key;
  #name;
  
  constructor(normalizer: MetricNormalizer, name = '') {
    this.#key = Symbol();
    this.normalizer = normalizer;
    this.#name = name;
  }
  
  get key() {
    return this.#key;
  }
  
  get name() {
    return this.#name;
  }
  
  normalize(range: number[]): number[] {
    return this.normalizer.normalize(range);
  }
}
