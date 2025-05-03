const types = [
  "All",
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy"
];

const TypeFilter = ({ setTypeFilter }) =>
  <select onChange={e => setTypeFilter(e.target.value)}>
    {types.map(type =>
      <option key={type} value={type}>
        {type.toUpperCase()}
      </option>
    )}
  </select>;

export default TypeFilter;
