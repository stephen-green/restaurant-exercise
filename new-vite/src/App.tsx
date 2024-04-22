import { useState } from 'react';

import { Collapsible } from './components/Collapsible.tsx'

import { CSVFileReader } from './classes/CSVFileReader.tsx'
import { MetricNormalizer } from './classes/MetricNormalizer.tsx'
import { MinToMaxNormalizer } from './classes/MinToMaxNormalizer.tsx'
import { MaxToMinNormalizer } from './classes/MaxToMinNormalizer.tsx'
import { AbsoluteValueNormalizer } from './classes/AbsoluteValueNormalizer.tsx'
import { Metric } from './classes/Metric.tsx'
import { RestaurantDataRow } from './classes/RestaurantDataRow.tsx'
import { RestaurantDataSet } from './classes/RestaurantDataSet.tsx'

import './App.css';

function App() {
  const scoreDisplayPrecision = 3;
  
  const [restaurants, setRestaurants] = useState([]);
  const [metrics, setMetrics] = useState([]);
  
  async function handleRestaurantFileSelected(e) {
    let restaurants = [];
    let metrics = [];
    if (e.target.files.length) {
      let file = e.target.files[0];
      let data = await loadRestaurantDataFile(file);
      restaurants = data.getBestRestaurants();
      metrics = data.metrics;
    }
    
    setRestaurants(restaurants);
    setMetrics(metrics);
  }
  
  /*
   * Load a list of restaurants from a CSV data file, along with their corresponding metrics.
   */
  async function loadRestaurantDataFile(file): Promise<RestaurantDataSet> {
    let document = await new CSVFileReader({enableHeader: true}).readAll(file);
    let metrics = [
      {columnName: 'Net Sales', normalizer: new MinToMaxNormalizer(), csvIndex: 1},
      {columnName: 'Transaction Count', normalizer: new MinToMaxNormalizer(), csvIndex: 2},
      {columnName: 'Cash Over/Short', normalizer: new AbsoluteValueNormalizer(0), csvIndex: 3},
      {columnName: 'Beverage Count', normalizer: new MinToMaxNormalizer(), csvIndex: 4},
      {columnName: 'Speed of Service Total Seconds', normalizer: new MaxToMinNormalizer(), csvIndex: 5},
      {columnName: 'Discount Total Amount', normalizer: new MaxToMinNormalizer(), csvIndex: 6}
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
        <div className="content">
          <label htmlFor="restaurant-file-selector" className="button-label">Select File</label>
          <input id="restaurant-file-selector" type="file" accept=".csv" onChange={handleRestaurantFileSelected} />
        </div>
      </section>
      
      <section className="restaurant-list">
      {restaurants.length > 0 && (<>
        <h1>Best Restaurants</h1>
        <div className="content">
          <ol>
          {restaurants.map((r, i) =>
            <li className="restaurant" key={i}><Collapsible>
              <div className="restaurant-header"><div className="score">{r.score.toFixed(scoreDisplayPrecision)}</div>{r.restaurant.locationName}</div>
              <ul className="restaurant-footer">
              {metrics.map((m, i) =>
                <li key={i}><div className="metric"><div className="score">{r.getScore(m).toFixed(scoreDisplayPrecision)}</div>{m.name}</div></li>
              )}
              </ul>
            </Collapsible></li>
          )}
          </ol>
        </div>
      </>)}
      </section>
    </>
  );
}

export default App
