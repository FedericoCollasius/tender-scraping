import TenderTable from "./TenderTable";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function FiltrableTenderTable({ tenders }) {
  const [filterText, setFilterText] = useState("");

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <TenderTable tenders={tenders} filterText={filterText} />
    </div>
  );
}
