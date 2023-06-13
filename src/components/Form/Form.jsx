import React, { useState, useEffect } from "react";

const Form = () => {
  const [mediaLink, setMediaLink] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [mediaDesc, setMediaDesc] = useState("");
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  
  useEffect(() => {
    const existingData = localStorage.getItem("formData");
    const parsedData = existingData ? JSON.parse(existingData) : [];
    setData(parsedData);
    setFilterText("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mediaLink || !mediaName || !mediaDesc) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const newData = {
      id: new Date().getTime(),
      mediaLink,
      mediaName,
      mediaDesc,
    };

    setData((prevData) => [...prevData, newData]);

    const existingData = localStorage.getItem("formData");
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.push(newData);
    localStorage.setItem("formData", JSON.stringify(parsedData));

    setMediaLink("");
    setMediaName("");
    setMediaDesc("");
  };

  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  let filteredData = data;
  if (filterText) {
    filteredData = data.filter(
      (row) =>
        row.mediaLink.toLowerCase().includes(filterText.toLowerCase()) ||
        row.mediaName.toLowerCase().includes(filterText.toLowerCase()) ||
        row.mediaDesc.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Sosyal Medya Linki:
          <input
            type="text"
            value={mediaLink}
            onChange={(e) => setMediaLink(e.target.value)}
          />
        </label>
        <label>
          Sosyal Medya Adı:
          <input
            type="text"
            value={mediaName}
            onChange={(e) => setMediaName(e.target.value)}
          />
        </label>
        <label>
          Açıklama:
          <input
            type="text"
            value={mediaDesc}
            onChange={(e) => setMediaDesc(e.target.value)}
          />
        </label>
        <button type="submit">Kaydet</button>
      </form>
      <input
        type="text"
        value={filterText}
        onChange={handleFilter}
        placeholder="Ara..."
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("mediaLink")}>Sosyal Medya Linki</th>
            <th onClick={() => handleSort("mediaName")}>Sosyal Medya Adı</th>
            <th onClick={() => handleSort("mediaDesc")}>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.mediaLink}</td>
              <td>{item.mediaName}</td>
              <td>{item.mediaDesc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>
        Önceki
      </button>
      <button
        onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
      >
        Sonraki
      </button>

      <p>
        {currentPage} / {totalPages}
      </p>
      <label>
        Show:
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
};

export default Form;
