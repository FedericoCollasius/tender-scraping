import TenderRow from "./TenderRow";

export default function TenderTable({ tenders, filterText }) {
  const rows = tenders
    .filter((tender) =>
      tender.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map((tender, index) => <TenderRow key={index} tender={tender} />);

  return (
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
  );
}
