import { useState } from 'react';

import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  
  class TextFileReader {
    async readLines(file, {skipEmpty = false} = {}) {
      let lines = this.#splitLines(await this.readAll(file));
      return skipEmpty ? lines.filter(text => text) : lines;
    }
    
    async readAll(file) {
      return await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.addEventListener('load', e => resolve(reader.result));
        reader.readAsText(file);
      });
    }
    
    #splitLines(text) {
      return text.split(/\r\n|\n|\r/g);
    }
  }
  
  class CSVFileReader {
    constructor({separator = ',', trimWhitespace = true} = {}) {
      this.separator = separator;
      this.trimWhitespace = trimWhitespace;
    }
    
    async readAll(file) {
      let header = null;
      let rows = [];
      
      let lines = await new TextFileReader().readLines(file, {skipEmpty: true});
      if (lines.length) {
        // Skip first line, assumed to be header.
        header = this.#splitCSV(lines[0]);
        rows = lines.slice(1).map(line => this.#splitCSV(line));
      }
      
      return {
        header: header,
        rows: rows
      }
    }
    
    #splitCSV(text) {
      let fields = text.split(this.separator);
      if (this.trimWhitespace) {
        fields = fields.map(text => text.trim());
      }
      
      return fields;
    }
  }
  
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
