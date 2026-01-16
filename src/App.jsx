import { assets } from "./data/assets";
import "./app.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Dune: Imperium Assets</h1>
      </header>

      <main className="grid">
        {assets.map(asset => (
          <div key={asset.id} className="card">
            <img src={asset.image} alt={asset.name} />
            <h3>{asset.name}</h3>
            <p>{asset.category}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;