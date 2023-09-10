function TenderRow({ tender }) {
  const name = tender.name;
  const dateofpublication = tender.dateofpublication;
  const url = tender.url;
  const source = tender.source;

  return (
    <tr>
      <td>{name}</td>
      <td>{dateofpublication}</td>
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

function SourceFilter({ tenders }) {
  const sources = [...new Set(tenders.map((tender) => tender.source))];

  return (
    <div>
      {uniqueSources.map((source, index) => (
        <div key={index}>
          <label>
            <input type="checkbox" />
            {source}
          </label>
        </div>
      ))}
    </div>
  );
}

function DateFilter({ tenders }) {
  const startDate = "2023-01-01";
  const endDate = "2023-12-31";

  const filteredTenders = tenders.filter((tender) => {
    const tenderDate = new Date(tender.dateofpublication);
    return tenderDate >= new Date(startDate) && tenderDate <= new Date(endDate);
  });

  return (
    <div>
      <ul>
        {filteredTenders.map((tender, index) => (
          <li key={index}>
            {tender.name} - {tender.dateofpublication} - {tender.url} -{" "}
            {tender.source}
          </li>
        ))}
      </ul>
    </div>
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

const TENDERS = [
  {
    name: "Renovación de Red Secundaria e Instalación de Cabeceras - VR Morón (MOR-DMA014A, MOR-DMA014B,MOR-DMA015, MOR-DMA016, MOR-DMA017A, MOR-DMA017B Y MOR-DMA020) OA70237",
    dateofpublication: "2023-08-24",
    url: "https://www.aysa.com.ar/proveedores/licitaciones/Licitaciones-Obras-Expansion/Detalle_de_Licitaciones_Obras?id=7139AF87-0D5C-4D59-9ED0-FAA104FE404F",
    source: "AYSA",
  },
  {
    name: "Red Secundaria Cloacal Dique Luján (NC70057)",
    dateofpublication: "2023-08-07",
    url: "https://www.aysa.com.ar/proveedores/licitaciones/Licitaciones-Obras-Expansion/Detalle_de_Licitaciones_Obras?id=716D9EDC-57D6-476E-9CDF-53A337B3D3A7",
    source: "AYSA",
  },
  {
    name: "Red Secundaria Cloacal Barrio Hudson Resto - Etapa 1 (SC70382)",
    dateofpublication: "2023-08-03",
    url: "https://www.aysa.com.ar/proveedores/licitaciones/Licitaciones-Obras-Expansion/Detalle_de_Licitaciones_Obras?id=A128FC2B-20BA-406B-B25B-3709397CF1F8",
    source: "AYSA",
  },
];

export default function App() {
  return <DateFilter tenders={TENDERS} />;
}
