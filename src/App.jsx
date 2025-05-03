import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import TypeFilter from "./Components/TypeFilter";
import PokemonCard from "./Components/PokemonCard";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const details = await Promise.all(
          data.results.map(async pokemon => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        setPokemonList(details);
        setFilteredList(details);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Pokémon.");
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(
    () => {
      let filtered = pokemonList;

      if (searchTerm) {
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (typeFilter !== "All") {
        filtered = filtered.filter(p =>
          p.types.some(t => t.type.name === typeFilter)
        );
      }

      setFilteredList(filtered);
    },
    [searchTerm, typeFilter, pokemonList]
  );

  if (loading) return <p>Loading Pokémon...</p>;
  if (error)
    return (
      <p>
        {error}
      </p>
    );

  return (
    <div className="app-container">
      <Header />
      <div className="controls">
        <SearchBar setSearchTerm={setSearchTerm} />
        <TypeFilter setTypeFilter={setTypeFilter} />
      </div>
      <div className="pokemon-grid">
        {filteredList.length
          ? filteredList.map(pokemon =>
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            )
          : <p>No Pokémon found.</p>}
      </div>
    </div>
  );
};

export default App;
