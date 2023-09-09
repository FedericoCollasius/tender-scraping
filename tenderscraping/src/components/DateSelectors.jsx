function DateSelectors({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="date-inputs">
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="input-date"
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="input-date"
      />
    </div>
  );
}

export default DateSelectors;
