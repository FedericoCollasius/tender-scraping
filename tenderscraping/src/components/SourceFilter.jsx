export default function SourceFilter({
  sources,
  selectedSources,
  onSourceChange,
}) {
  return (
    <div className="source-filter">
      <label>Fuente de la licitación: </label>
      <select
        value={selectedSources[0] || ""}
        onChange={(e) => onSourceChange([e.target.value])}
      >
        <option value="">Todas</option>
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
}
