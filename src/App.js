import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CreateData from "./components/CreateData/CreateData";
import Table from "./components/Table/Table";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("link");
  const handleSearch = (query)=>{
    setInputValue(query);

  };
  const handleSelected = (value)=>{
    setSelectedValue(value);
    
  };
  let newData = [];
  const handleSaveData = (data)=>{
    const existingData = localStorage.getItem("savedData");
    
    if (existingData) {
      newData = JSON.parse(existingData);
    }
    newData.push(data);

    localStorage.setItem("savedData", JSON.stringify(newData));

    
  }
  
  return (
    <div className="App">
      <Header />
      
        <div className="app-content-header container">
          <Search onInput = {handleSearch} onSelected= {handleSelected}/>
          <CreateData onSave={handleSaveData }/>
          
        </div>
        <div className="container app-mt">
        <Table onSearch={inputValue} onSelect = {selectedValue}/>
        </div>
    </div>
  );
}

export default App;
