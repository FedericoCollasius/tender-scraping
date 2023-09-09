import React, { useState, useEffect } from "react";
import "./Table.css";
import SearchBox from "./SearchBox";
import DateSelectors from "./DateSelectors";
import SourceSelector from "./SourceSelector";
import TableHeaders from "./TableHeaders";
import TableRows from "./TableRows";

function TenderTable() {
  const [tenders, setTenders] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSources, setSelectedSources] = useState([]);

  useEffect(() => {
    fetch("/data/tenders.json")
      .then((response) => response.json())
      .then((data) => setTenders(data));
  }, []);

  const uniqueSources = [...new Set(tenders.map((tender) => tender.source))];

  const filteredTenders = tenders.filter((tender) => {
    const tenderDate = new Date(tender.dateofpublication);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      tender.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (!start || tenderDate >= start) &&
      (!end || tenderDate <= end) &&
      (selectedSources.length === 0 || selectedSources.includes(tender.source))
    );
  });

  return (
    <div className="container">
      <SearchBox searchName={searchName} setSearchName={setSearchName} />
      <DateSelectors
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <SourceSelector
        uniqueSources={uniqueSources}
        selectedSources={selectedSources}
        setSelectedSources={setSelectedSources}
      />

      <table className="tender-table">
        <thead>
          <TableHeaders />
        </thead>
        <tbody>
          <TableRows filteredTenders={filteredTenders} />
        </tbody>
      </table>
    </div>
  );
}

export default TenderTable;
