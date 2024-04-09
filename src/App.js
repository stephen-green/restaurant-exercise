import { useState } from 'react';

import { CSVFileReader } from './classes/CSVFileReader.js'
import { MetricNormalizer } from './classes/MetricNormalizer.js'
import { MinToMaxNormalizer } from './classes/MinToMaxNormalizer.js'
import { MaxToMinNormalizer } from './classes/MaxToMinNormalizer.js'
import { ErrorFromTargetNormalizer } from './classes/ErrorFromTargetNormalizer.js'
import { Metric } from './classes/Metric.js'
import { RestaurantDataRow } from './classes/RestaurantDataRow.js'
import { RestaurantDataSet } from './classes/RestaurantDataSet.js'

import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  
  async function handleRestaurantFileSelected(e) {
    let restaurants = [];
    if (e.target.files.length) {
      let file = e.target.files[0];
      let restaurantData = await loadRestaurantDataFile(file);
      restaurants = restaurantData.getBestRestaurants().map(r => r.restaurant.locationName);
    }
    
    setRestaurants(restaurants);
  }
  
  /*
   * Load a list of restaurants from a CSV data file, along with their corresponding metrics.
   */
  async function loadRestaurantDataFile(file): Promise<RestaurantDataSet> {
    let document = await new CSVFileReader({enableHeader: true}).readAll(file);
    let metrics = [
      {normalizer: new MinToMaxNormalizer(), columnName: 'Net Sales', csvIndex: 1},
      {normalizer: new MinToMaxNormalizer(), columnName: 'Transaction Count', csvIndex: 2},
      {normalizer: new ErrorFromTargetNormalizer(0), columnName: 'Cash Over/Short', csvIndex: 3},
      {normalizer: new MinToMaxNormalizer(), columnName: 'Beverage Count', csvIndex: 4},
      {normalizer: new MaxToMinNormalizer(), columnName: 'Speed of Service Total Seconds', csvIndex: 5},
      {normalizer: new MaxToMinNormalizer(), columnName: 'Discount Total Amount', csvIndex: 6}
    ].map(m => ({
      metric: new Metric(m.normalizer, m.columnName),
      csvIndex: m.csvIndex
    }));
    let restaurantData = document.rows.map(row => {
      let locationName = row[0];      
      let restaurant = new RestaurantDataRow(locationName);
      for (const metric of metrics) {
        if (metric.csvIndex >= row.length) {
          throw new Error(`In CSV file, restaurant "${locationName}" is missing metric "${metric.metric.name}" in column #${metric.csvIndex + 1}.`);
        }
        
        let value = parseFloat(row[metric.csvIndex]);
        restaurant.setValue(metric.metric, value);
      }
      
      return restaurant;
    });
    
    return new RestaurantDataSet(restaurantData, metrics.map(m => m.metric));
  }
  
  return (
    <>
      <section>
        <h1>Restaurant File Import</h1>
        <input id="restaurant-file-selector" type="file" accept=".csv" onChange={handleRestaurantFileSelected} />
      </section>
      
      <section>
        <h1>Best Restaurants</h1>
        <ul>{restaurants.map(restaurant => <li>{restaurant}</li>)}</ul>
      </section>
    </>
  );
}

export default App;
