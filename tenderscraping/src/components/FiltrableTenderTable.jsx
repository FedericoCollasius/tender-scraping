import TenderTable from "./TenderTable";
import SearchBar from "./SearchBar";
import DateRangeFilter from "./DateRangeFilter";
import { useState } from "react";

export default function FiltrableTenderTable({ tenders }) {
  const [filterText, setFilterText] = useState("");
  const [filterDate, setFilterDate] = useState();

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <DateRangeFilter
        filterDate={filterDate}
        onFilterDateChange={setFilterDate}
      />
      <TenderTable tenders={tenders} filterText={filterText} />
    </div>
  );
}
