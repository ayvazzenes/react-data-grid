import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CreateData from "./components/CreateData/CreateData";
import Table from "./components/Table/Table";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("link");
  const [tasks, setTasks] = useState([]);
  const handleSearch = (query) => {
    setInputValue(query);
  };
  const handleSelected = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleSaveData = (data) => {
    const id = uuidv4();
    const taskWithId = { ...data, id };
    const tasksArray = [...tasks, taskWithId];
    setTasks(tasksArray);
    // Verileri localStorage'a kaydet
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  };

  return (
    <div className="App">
      <Header />
      <div className="overlay">
        <div className="app-wrapper">
          <div className="app-content-header app-pd">
            <Search onInput={handleSearch} onSelected={handleSelected} />
            <CreateData onSave={handleSaveData} />
          </div>
          <div className="app-pd app-mt">
            <Table
              onSearch={inputValue}
              onSelect={selectedValue}
              tasks={tasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
