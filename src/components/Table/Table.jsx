import React, { useState } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./Table.css";

const Table = ({ onSearch, onSelect, tasks }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredData = tasks.filter((item) => {
    const mediaName = item["media_" + onSelect].toLowerCase();
    return mediaName.includes(onSearch.toLowerCase());
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortedColumn) {
      const valueA = a[sortedColumn].toLowerCase();
      const valueB = b[sortedColumn].toLowerCase();
      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      return 0;
    }
  });
  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageCount = Math.ceil(sortedData.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  return (
    <div>
      <table className="app-table">
        <thead className="app-table-head">
          <tr className="app-table-head-row">
            <th>
              <div
                onClick={() => handleSort("media_link")}
                className="sortable-css"
              >
                Sosyal Medya Link
                {sortedColumn === "media_link" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
                {sortedColumn !== "media_link" && (
                  <span>
                    <BsArrowDown />
                  </span>
                )}
              </div>
            </th>
            <th>
              <div
                onClick={() => handleSort("media_name")}
                className="sortable-css"
              >
                Sosyal Medya Adı
                {sortedColumn === "media_name" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
                {sortedColumn !== "media_name" && (
                  <span>
                    <BsArrowDown />
                  </span>
                )}
              </div>
            </th>
            <th>
              <div
                onClick={() => handleSort("media_description")}
                className="sortable-css"
              >
                Açıklama
                {sortedColumn === "media_description" && (
                  <span>
                    {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                  </span>
                )}
                {sortedColumn !== "media_description" && (
                  <span>
                    <BsArrowDown />
                  </span>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="app-table-body">
          {currentPageData.map((item) => (
            <tr className="app-table-body-row" key={item.id}>
              <td>{item.media_link}</td>
              <td>{item.media_name}</td>
              <td>{item.media_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <div className="pagination-show">
          <label>Show:</label>
          <select
            value={perPage}
            onChange={(e) => {
              const newPerPage = parseInt(e.target.value);
              setPerPage(newPerPage);

              const newPageCount = Math.ceil(sortedData.length / newPerPage);
              if (currentPage > newPageCount) {
                setCurrentPage(1);
              }
            }}
          >
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="pagination-text-arrow">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <IoIosArrowBack />
          </button>
          <span className="page-number"><span className="page-active">{`${currentPage}`}</span> of <span className="page-total">{`${pageCount}`}</span></span>
          <button onClick={handleNextPage} disabled={currentPage === pageCount}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
