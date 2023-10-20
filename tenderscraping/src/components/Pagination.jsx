import { useState, useEffect } from "react";

export default function Pagination({ totalPages, currentPage, onChangePage }) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(startPage + 9, totalPages);

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    }

    const numbers = [];
    for (let i = startPage; i <= endPage; i++) {
      numbers.push(i);
    }

    setPageNumbers(numbers);
  }, [totalPages, currentPage]);

  return (
    <div className="pagination">
      <button
        onClick={() => onChangePage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onChangePage(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onChangePage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
