export default function TenderRow({ tender }) {
  // Convierte la fecha de "Año-Mes-Dia" a "Día/Mes/Año"
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <tr>
      <td>
        <a href={tender.url} target="_blank" rel="noopener noreferrer">
          {tender.name}
        </a>
      </td>
      <td>{formatDate(tender.dateofpublication)}</td>
      <td>{tender.source}</td>
    </tr>
  );
}
