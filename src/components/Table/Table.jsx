import React, { useState, useEffect } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./Table.css";
import { sortData, getPageData } from "../../services/TableService";

const Table = ({ onSearch, onSelect, tasks }) => {
  //tasks gelen datalarımı temsil eder
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [perPage, setPerPage] = useState(() => {
    const savedPerPage = localStorage.getItem("perPage");
    return savedPerPage ? JSON.parse(savedPerPage) : 4;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const savedCurrentPage = localStorage.getItem("currentPage");
    return savedCurrentPage ? JSON.parse(savedCurrentPage) : 1;
  });

  useEffect(() => {
    localStorage.setItem("perPage", JSON.stringify(perPage));
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [perPage, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Arama terimi veya seçilen sütun değiştiğinde sayfayı sıfırla
  }, [onSearch, onSelect]);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      // Eğer tıklanan sütun zaten sıralı sütunsa
      setSortOrder(
        sortOrder === "asc" ? "desc" : "asc"
      ); /* Sıralama sırasını değiştir (asc ise desc, desc ise asc) */
    } else {
      /* Eğer tıklanan sütun başka bir sütunsa */
      setSortedColumn(column); /* Sıralama sütununu değiştir */
      setSortOrder("asc"); /* Sıralama sırasını varsayılan olarak asc yap */
    }
  };

  const filteredData = tasks.filter((item) => {
    const mediaName = item["media_" + onSelect].toLowerCase();
    return mediaName.includes(onSearch.toLowerCase());
  });

  /* tablodaki sayfayı ilerletme */
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
  //Tableservices.js dosyasından sıralama fonksiyonu alınarak işlemler yapılır
  const sortedData = sortData(filteredData, sortedColumn, sortOrder);

  //Tableservices.js dosyasından sayfalama fonksiyonu alınarak sayfalama işlemi yapılır
  const { currentPageData, pageCount } = getPageData(
    sortedData,
    currentPage,
    perPage
  );

  return (
    <div>
      <div className="table-wrapper">
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
              <div className="line-height-1"></div>
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
              <div className="line-height-2"></div>
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
            <div className="table-row-wrapper">
              {currentPageData.map((item) => (
                <tr className="app-table-body-row" key={item.id}>
                  <td>{item.media_link}</td>
                  <td>{item.media_name}</td>
                  <td>{item.media_description}</td>
                </tr>
              ))}
            </div>
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="pagination-show">
          <label>Show:</label>
          <select
            className="pagination-select"
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
            <option className="pagination-option" value={4}>
              4 rows
            </option>
            <option className="pagination-option" value={6}>
              6 rows
            </option>
            <option className="pagination-option" value={10}>
              10 rows
            </option>
          </select>
        </div>
        <div className="pagination-text-arrow">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "disabled-button" : "custom-button"}
          >
            <IoIosArrowBack />
          </button>
          <span className="page-number">
            <span className="page-active">{`${currentPage}`}</span> of{" "}
            <span className="page-total">{`${pageCount}`}</span>
          </span>
          <button
            onClick={handleNextPage}
            className={
              currentPage === pageCount ? "disabled-button" : "custom-button"
            }
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
