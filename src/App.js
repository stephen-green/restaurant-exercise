import './App.css';

function App() {
  return (
    <>
      <section>
        <h1>Restaurant File Import</h1>
        <input id="restaurant-file-selector" type="file" accept=".csv" />
      </section>
      
      <section>
        <h1>Best Restaurants</h1>
        <ul></ul>
      </section>
    </>
  );
}

export default App;
