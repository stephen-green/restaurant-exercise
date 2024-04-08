import { useState } from 'react';

import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  
  function handleRestaurantFileSelected(e) {
    let reader = new FileReader();
    reader.addEventListener('load', e2 => setRestaurants(reader.result.split(/\r\n|\n|\r/g).slice(1))); // Skip first line, assumed to be header.
    reader.readAsText(e.target.files[0]);
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
