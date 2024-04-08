import { useState } from 'react';

import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  
  async function handleRestaurantFileSelected(e) {
    setRestaurants(await readLines(e.target.files[0]).slice(1)); // Skip first line, assumed to be header.
  }
  
  async function readLines(file) {
    return splitLines(await readText(file));
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
