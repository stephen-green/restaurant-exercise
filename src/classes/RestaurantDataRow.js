export class RestaurantDataRow {
  #locationName: string;
  #metrics;
  
  constructor(locationName) {
    this.#locationName = locationName;
    this.#metrics = {};
  }
  
  get locationName(): string {
    return this.#locationName;
  }
  
  getValue(metric): number {
    return this.#metrics[metric.key];
  }
  
  setValue(metric, value) {
    this.#metrics[metric.key] = value;
  }
}
