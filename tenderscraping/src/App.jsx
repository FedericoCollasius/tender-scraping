import { tenders } from "./assets/data.js";

function TenderRow({ tender }) {
  const name = tender.name;
  const dateOfPublication = tender.dateOfPublication;
  const url = tender.url;
  const source = tender.source;

  return (
    <tr>
      <td>{name}</td>
      <td>{dateOfPublication}</td>
      <td>
        <a href={url}>{url}</a>
      </td>
      <td>{source}</td>
    </tr>
  );
}

function TenderTable({ tenders }) {
  const rows = [];

  tenders.map((tender) => {
    rows.push(<TenderRow tender={tender} key={tender.name} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha de Publicacion</th>
          <th>URL</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Buscar..." />
      <label>
        <input type="checkbox" />{" "}
      </label>
    </form>
  );
}

function FiltrableTenderTable({ tenders }) {
  return (
    <div>
      <SearchBar />
      <TenderTable tenders={tenders} />
    </div>
  );
}

export default function App() {
  return <FiltrableTenderTable tenders={tenders} />;
}
