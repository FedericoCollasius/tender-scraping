function SourceSelector({
  uniqueSources,
  selectedSources,
  setSelectedSources,
}) {
  const handleSourceChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedSources(selectedOptions);
  };

  return (
    <div className="source-selector">
      <label className="source-label">Select sources</label>
      <select
        multiple
        onChange={handleSourceChange}
        className="source-dropdown"
      >
        {uniqueSources.map((source, index) => (
          <option key={index} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SourceSelector;
