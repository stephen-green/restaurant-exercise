import { RestaurantDataRow } from './RestaurantDataRow.js'
import { RestaurantScore } from './RestaurantScore.js'
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
  getBestRestaurants(): RestaurantScore[] {
    // Normalize scores for all restaurants, per metric.
    let allScoresByMetric = this.#metrics.map(metric => ({
      metric: metric,
      restaurantScores: metric.normalize(this.#restaurants.map(r => r.getValue(metric))) // All restaurant scores for this metric, parallel array to complete restaurant list
    }));
    
    // Join metrics back against complete restaurant list.
    let rankedRestaurants = [...Array(this.#restaurants.length).keys()].map(i => new RestaurantScore(
      this.#restaurants[i],
      allScoresByMetric.map(metric => metric.restaurantScores[i]).reduce((sum, score) => sum + score) / allScoresByMetric.length, // Average score for this restaurant, over all metrics (simple average, unweighted)
      allScoresByMetric.map(metric => ({metric: metric.metric, score: metric.restaurantScores[i]})) // Individual metrics for this restaurant
    ))
    
    return rankedRestaurants.sort((r1, r2) => r2.score - r1.score); // Restaurants ranked best (1) to worst (0)
  }
}
