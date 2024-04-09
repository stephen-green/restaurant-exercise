import { Metric } from './Metric.js'

/*
 * A restaurant with metrics describing its performance.
 */
export class RestaurantDataRow {
  #locationName: string;
  #metrics; // Dictionary, values by metric
  
  constructor(locationName) {
    this.#locationName = locationName;
    this.#metrics = {};
  }
  
  /*
   * A human-readable name of the restaurant location
   */
  get locationName(): string {
    return this.#locationName;
  }
  
  /*
   * Get the given metric value for this restaurant.
   */
  getValue(metric: Metric): number {
    return this.#metrics[metric.key];
  }
  
  /*
   * Set the given metric value for this restaurant.
   */
  setValue(metric: Metric, value: number): void {
    this.#metrics[metric.key] = value;
  }
}
