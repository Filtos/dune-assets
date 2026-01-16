import { cards } from "./data/assets";
import { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  const categories = [
    "All",
    ...Array.from(new Set(cards.map(card => card.category))).sort()
  ];

  const filteredCards = cards.filter(card => {
    const matchesCategory =
      selectedCategory === "All" || card.category === selectedCategory;

    const matchesSearch = card.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Close modal on ESC
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Dune: Imperium Assets</h1>

        <div className="controls">
          <input
            type="text"
            className="search"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="category-select"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="grid">
        {filteredCards.map(card => (
          <div
            key={card.name}
            className="card clickable"
            onClick={() => setActiveCard(card)}
          >
            <img src={card.image} alt={card.name} />
            <h3>{card.name}</h3>
            <p>{card.category}</p>
          </div>
        ))}

        {filteredCards.length === 0 && (
          <p className="no-results">No matching cards</p>
        )}
      </main>

      {/* Modal */}
      {activeCard && (
        <div className="modal-backdrop" onClick={() => setActiveCard(null)}>
          <div
            className="modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setActiveCard(null)}
            >
              ×
            </button>

            <img
              src={activeCard.image}
              alt={activeCard.name}
              className="modal-image"
            />

            <h2>{activeCard.name}</h2>
            <p>{activeCard.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
