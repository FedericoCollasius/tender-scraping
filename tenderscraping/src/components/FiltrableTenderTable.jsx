import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import TenderTable from "./TenderTable";
import DateFilter from "./DateFilter";
import Pagination from "./Pagination";
import SourceFilter from "./SourceFilter";

export default function FiltrableTenderTable({ tenders }) {
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tendersPerPage, setTendersPerPage] = useState(10);
  const [allSources, setAllSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  useEffect(() => {
    const uniqueSources = [...new Set(tenders.map((tender) => tender.source))];
    setAllSources(uniqueSources);
  }, [tenders]);

  const handleDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="container">
      <div className="filter-bar">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
        <SourceFilter
          sources={allSources}
          selectedSources={selectedSources}
          onSourceChange={setSelectedSources}
        />
        <div className="items-per-page">
          <label>Licitaciones por página: </label>
          <select
            value={tendersPerPage}
            onChange={(e) => setTendersPerPage(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>
      <TenderTable
        tenders={tenders}
        filterText={filterText}
        startDate={startDate}
        endDate={endDate}
        currentPage={currentPage}
        tendersPerPage={tendersPerPage}
        selectedSources={selectedSources}
      />
      <Pagination
        totalPages={Math.ceil(tenders.length / tendersPerPage)}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}
