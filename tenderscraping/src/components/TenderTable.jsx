import TenderRow from "./TenderRow";

function normalizeText(text) {
  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const cleaned = normalized.replace(/[^a-z0-9]/g, "");
  return cleaned;
}

export default function TenderTable({
  tenders,
  filterText,
  startDate,
  endDate,
  currentPage,
  tendersPerPage,
  selectedSources,
}) {
  const normalizedFilterText = normalizeText(filterText);

  const filteredTenders = tenders.filter((tender) => {
    const tenderDate = new Date(tender.dateofpublication);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && tenderDate < start) return false;
    if (end && tenderDate > end) return false;
    if (!normalizeText(tender.name).includes(normalizedFilterText))
      return false;
    if (selectedSources.length > 0 && !selectedSources.includes(tender.source))
      return false;
    return true;
  });

  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(
    indexOfFirstTender,
    indexOfLastTender
  );
  const rows = currentTenders.map((tender, index) => (
    <TenderRow key={index} tender={tender} />
  ));

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha de Publicacion</th>
            <th>Pagina</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
