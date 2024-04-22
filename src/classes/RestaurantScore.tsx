import { RestaurantDataRow } from './RestaurantDataRow.tsx'
import { Metric } from './Metric.tsx'

/*
 * A single restaurant scored based on different metrics
 */
export class RestaurantScore {
    #restaurant: RestaurantDataRow;
    #score: number;
    #scoresByMetric; // Individual metrics for this restaurant
    
    constructor(restaurant: RestaurantDataRow, score: number, scoresByMetric: {metric: Metric, score: number}[]) {
        this.#restaurant = restaurant;
        this.#scoresByMetric = {};
        for (const metric of scoresByMetric) {
            this.#scoresByMetric[metric.metric.key] = metric.score;
        }
        
        this.#score = score;
    }
    
    /*
     * This restaurant, the restaurant being scored
     */
    get restaurant() {
        return this.#restaurant;
    }
    
    /*
     * Average score for this restaurant, over all metrics (simple average, unweighted), rated from best (1) to worst (0)
     */
    get score() {
        return this.#score;
    }
    
    /*
     * Get the restaurant score for the given metric, rated from best (1) to worst (0)
     */
    getScore(metric: Metric) {
        return this.#scoresByMetric[metric.key];
    }
}
