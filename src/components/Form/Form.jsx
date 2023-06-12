import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Search from "../Search/Search";
import handleFiltered from "../../services/filterServices";

const FormComponent = () => {
  const [name, setName] = useState("");

  const [surname, setSurname] = useState("");

  const [birthPlace, setBirthPlace] = useState("");

  const [data, setData] = useState([]);

  const [filterText, setFilterText] = useState([]);

  useEffect(() => {
    const existingData = localStorage.getItem("formData");
    const parsedData = existingData ? JSON.parse(existingData) : [];
    setData(parsedData);
    setFilterText(parsedData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !surname || !birthPlace) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const newData = {
      id: new Date().getTime(),
      name,
      surname,
      birthPlace,
    };

    setData((prevData) => [...prevData, newData]);

    const existingData = localStorage.getItem("formData");
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.push(newData);
    setFilterText(parsedData);
    localStorage.setItem("formData", JSON.stringify(parsedData));

    setName("");
    setSurname("");
    setBirthPlace("");
  };

  const columns = [
    {
      name: "İsim",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Soyisim",
      selector: (row) => row.surname,
      sortable: true,
    },
    {
      name: "Doğum Yeri",
      selector: (row) => row.birthPlace,
      sortable: true,
    },
  ];
  const paginationRowsPerPageOptions = [3, 5, 10, 20];

  const handleFilter = (query) => {
    const newData = handleFiltered(query, data);
    setFilterText(newData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          İsim:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Soyisim:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>
        <label>
          Doğum Yeri:
          <input
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
          />
        </label>
        <button type="submit">Kaydet</button>
      </form>
      <h2>Kaydedilen Veriler</h2>
      <Search onInput={handleFilter} />
      <DataTable
        columns={columns}
        data={filterText}
        selectableRows
        ixedHeader
        pagination
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationPerPage={3}
      />
    </div>
  );
};

export default FormComponent;
