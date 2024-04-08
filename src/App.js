import { useState } from 'react';

import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  
  async function handleRestaurantFileSelected(e) {
    let restaurants = [];
    if (e.target.files.length) {
      let file = e.target.files[0];
      let lines = await readLines(file, {skipEmpty: true});
      if (lines.length) {
        // Skip first line, assumed to be header.
        let header = lines[0];
        let rows = lines.slice(1);
        
        restaurants = rows;
      }
    }
    
    setRestaurants(restaurants);
  }
  
  async function readLines(file, {skipEmpty = false} = {}) {
    let lines = splitLines(await readText(file));
    return skipEmpty ? lines.filter(text => text) : lines;
  }
  
  async function readText(file) {
    return await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener('load', e => resolve(reader.result));
      reader.readAsText(file);
    });
  }
  
  function splitLines(text) {
    return text.split(/\r\n|\n|\r/g);
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
