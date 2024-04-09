export class RestaurantDataSet {
  #metrics: Metric[];
  #restaurants: RestaurantDataRow[];
  
  constructor(restaurants: RestaurantDataRow[], metrics: Metric[]) {
    this.#metrics = metrics;
    this.#restaurants = restaurants;
  }
  
  get restaurants() {
    return this.#restaurants;
  }
  
  getBestRestaurants() {
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
