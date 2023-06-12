import React, { useState } from 'react';

function Search({ onInput }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onInput(event.target.value); // Her değer değiştiğinde onInput'e değeri iletir
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
    />
  );
}


export default Search;
