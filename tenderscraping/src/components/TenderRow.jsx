export default function TenderRow({ tender }) {
  const name = tender.name;
  const dateOfPublication = tender.dateOfPublication;
  const url = tender.url;
  const source = tender.source;

  return (
    <tr>
      <td>
        <a href={url}>{name}</a>
      </td>
      <td>{dateOfPublication}</td>
      <td>{source}</td>
    </tr>
  );
}
