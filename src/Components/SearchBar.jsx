const SearchBar = ({ setSearchTerm }) =>
  <input
    type="text"
    placeholder="Search Pokémon..."
    onChange={e => setSearchTerm(e.target.value)}
  />;
export default SearchBar;
