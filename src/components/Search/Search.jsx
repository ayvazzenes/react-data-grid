import React, { useState } from "react";
import "./Search.css";
import logoUnion from "../../assets/icons/logo-union.png";

function Search({ onInput, onSelected }) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("link");

  //filtreleme için girinen kelime app componente props olarak geçilir
  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInputValue(value);
    onInput(value);
  };

  //filtreleme için seçilen filtre app componente props olarak geçilir
  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelected(selectedValue);
  };

  //filtreleme butonun aktif edilmesi
  const handleLogoClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="search-input"
          placeholder="Search objects..."
        />
        <button className="search-btn">
          <div className="circle">
            <div className="circle-line"></div>
          </div>
        </button>
      </div>
      <div className="logo-union">
        <img src={logoUnion} alt="logo-Union" onClick={handleLogoClick} />
        {isOpen && (
          <select
            className="custom-select"
            value={selectedOption}
            onChange={handleSelect}
          >
            <option className="custom-option" value="link">
              Medya Linki
            </option>
            <option className="custom-option" value="name">
              Medya Adı
            </option>
            <option className="custom-option" value="description">
              Açıklama
            </option>
          </select>
        )}
      </div>
    </div>
  );
}

export default Search;
