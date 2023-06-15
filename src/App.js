import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import CreateData from "./components/CreateData/CreateData";
import Table from "./components/Table/Table";
import { v4 as uuidv4 } from "uuid";
import { links } from "./services/data";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("link");
  const [tasks, setTasks] = useState([]);
  console.log(links);
  
  const handleSearch = (query) => {
    setInputValue(query);
  };

  const handleSelected = (value) => {
    setSelectedValue(value);
  };

  // Uygulama ilk yüklendiğinde localStorage'dan görevleri almak için useEffect hook'u
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else{
      const initialData = links.map(item => ({...item, id: uuidv4()}));
      setTasks(initialData);
      localStorage.setItem("tasks", JSON.stringify(initialData));
    }
  }, []);

  //datamdan gelen varsayalın veriler taskse atanır
  
  // Yeni bir görevi duruma ve localStorage'a ekleme
  const handleSaveData = (data) => {
    //rastgele id oluşturulur
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
