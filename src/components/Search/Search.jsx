import React, { useState } from "react";
import "./Search.css"
import logoUnion from "../../assets/icons/logo-union.png"

function Search({ onInput }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onInput(event.target.value); // Her değer değiştiğinde onInput'e değeri iletir
  };

  return (
    <div className="search-container">
      <form className="search-form">
        <input type="text" value={inputValue} onChange={handleChange} className="search-input" placeholder="Search objects..."/>
        <button type="submit" className="search-btn">
              <div className="circle">
                <div className="circle-line"></div>
              </div>
        </button>
      </form>
      <div className="logo-union">
            <img src={logoUnion} alt="logo-Union"/>
          </div>
    </div>
  );
}

export default Search;
