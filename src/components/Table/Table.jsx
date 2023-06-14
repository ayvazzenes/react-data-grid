import React, { useState } from "react";

import {BsArrowUp,BsArrowDown} from "react-icons/bs"
import "./Table.css";

const Table = ({ onSearch, onSelect, tasks }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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

  return (
    <table className="app-table">
      <thead className="app-table-head">
        <tr className="app-table-head-row">
          <th>
            <div onClick={() => handleSort("media_link")} className="sortable-css">
              Sosyal Medya Link
              {sortedColumn === "media_link" && (
                <span>{sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}</span>
              )}
              {sortedColumn !== "media_link" && (
                <span><BsArrowDown /></span>
              )}
            </div>
          </th>
          <th>
            <div onClick={() => handleSort("media_name")} className="sortable-css">
              Sosyal Medya Adı
              {sortedColumn === "media_name" && (
                <span>{sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}</span>
              )}
              {sortedColumn !== "media_name" && (
                <span><BsArrowDown /></span>
              )}
            </div>
          </th>
          <th>
            <div onClick={() => handleSort("media_description")} className="sortable-css">
              Açıklama
              {sortedColumn === "media_description" && (
                <span>{sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}</span>
              )}
              {sortedColumn !== "media_description" && (
                <span><BsArrowDown /></span>
              )}
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="app-table-body">
        {sortedData.map((item) => (
          <tr className="app-table-body-row" key={item.id}>
            <td>{item.media_link}</td>
            <td>{item.media_name}</td>
            <td>{item.media_description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
