import { RestaurantDataRow } from './RestaurantDataRow.js'
import { Metric } from './Metric.js'

/*
 * A list of restaurants, each with metrics describing their performance.
 */
export class RestaurantDataSet {
  #restaurants: RestaurantDataRow[];
  #metrics: Metric[];
  
  constructor(restaurants: RestaurantDataRow[], metrics: Metric[]) {
    this.#restaurants = restaurants;
    this.#metrics = metrics;
  }
  
  /*
   * Get all restaurants in the order they appear in the original data file.
   */
  get restaurants(): RestaurantDataRow[] {
    return this.#restaurants;
  }
  
  /*
   * Get all restaurants in order from best to worst, as scored by taking the normalized average of all metrics (equally weighted).
   */
  getBestRestaurants(): {restaurant: RestaurantDataRow, score: number, allScoresByMetric: {metric: Metric, score: number}[]}[] {
    let allScoresByMetric = this.#metrics.map(metric => ({
      metric: metric,
      restaurantScores: metric.normalize(this.#restaurants.map(r => r.getValue(metric)))
    }));
    let rankedRestaurants = [...Array(this.#restaurants.length).keys()].map(i => ({
      restaurant: this.#restaurants[i],
      score: allScoresByMetric.map(metric => metric.restaurantScores[i]).reduce((sum, score) => sum + score) / allScoresByMetric.length,
      allScoresByMetric: allScoresByMetric.map(metric => ({metric: metric.metric, score: metric.restaurantScores[i]}))
    }))
    return rankedRestaurants.sort((r1, r2) => r2.score - r1.score);
  }
}
