export default function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Buscar licitación..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </div>
  );
}
