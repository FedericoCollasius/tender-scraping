import { useState } from "react";

export default function DateFilter({ startDate, endDate, onDateChange }) {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleLastTwoWeeksClick = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 14);

    setLocalStartDate(start.toISOString().split("T")[0]);
    setLocalEndDate(end.toISOString().split("T")[0]);
    onDateChange(
      start.toISOString().split("T")[0],
      end.toISOString().split("T")[0]
    );
  };

  return (
    <div className="date-filter">
      <label>Desde: </label>
      <input
        type="date"
        value={localStartDate}
        onChange={(e) => setLocalStartDate(e.target.value)}
      />
      <label>Hasta: </label>
      <input
        type="date"
        value={localEndDate}
        onChange={(e) => setLocalEndDate(e.target.value)}
      />
      <button onClick={handleLastTwoWeeksClick}>Últimas dos semanas</button>
    </div>
  );
}
