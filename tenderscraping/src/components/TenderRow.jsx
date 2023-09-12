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

export default TenderRow;
