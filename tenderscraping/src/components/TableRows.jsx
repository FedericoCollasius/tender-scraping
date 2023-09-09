function TableRows({ filteredTenders }) {
  return (
    <>
      {filteredTenders.map((tender, index) => (
        <tr key={index} className="table-row">
          <td className="table-cell">{tender.name}</td>
          <td className="table-cell">{tender.dateofpublication}</td>
          <td className="table-cell">
            <a href={tender.url}>{tender.url}</a>
          </td>
          <td className="table-cell">{tender.source}</td>
        </tr>
      ))}
    </>
  );
}

export default TableRows;
