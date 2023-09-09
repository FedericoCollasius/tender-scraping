function SearchBox({ searchName, setSearchName }) {
  return (
    <input
      type="text"
      placeholder="Search by name"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
      className="input-text"
    />
  );
}

export default SearchBox;
