import { useState } from 'react';

import { CSVFileReader } from './classes/CSVFileReader'

import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  
  async function handleRestaurantFileSelected(e) {
    let restaurants = [];
    if (e.target.files.length) {
      let file = e.target.files[0];
      let document = await new CSVFileReader().readAll(file);
      restaurants = document.rows.map(row => row[0]);
    }
    
    setRestaurants(restaurants);
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
