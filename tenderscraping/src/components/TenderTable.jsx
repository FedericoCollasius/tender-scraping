import TenderRow from "./TenderRow";

export default function TenderTable({ tenders, filterText }) {
  const rows = [];

  tenders.forEach((tender) => {
    if (tender.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    rows.push(<TenderRow tender={tender} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha de Publiacion</th>
          <th>Pagina</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
