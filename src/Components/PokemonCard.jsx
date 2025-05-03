const PokemonCard = ({ pokemon }) =>
  <div className="pokemon-card">
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <h3>
      {pokemon.name.toUpperCase()}
    </h3>
    <p>
      ID: {pokemon.id}
    </p>
    <div className="types">
      {pokemon.types.map(t =>
        <span key={t.slot} className={`type-badge ${t.type.name}`}>
          {t.type.name}
        </span>
      )}
    </div>
  </div>;

export default PokemonCard;
