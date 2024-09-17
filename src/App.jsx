import { useState } from "react";
import './App.css'; 
import videoFile from './assets/background.mp4'; 

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]); 

  // Обработчик изменения поля ввода
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Обработчик добавления задачи
  const handleAddTask = () => {
    if (task.trim().length >= 3 && task.trim().length <= 200) {
      setTasks([...tasks, task]); 
      setTask(""); 
    }
  };

  
  const isAddButtonDisabled = task.trim().length < 3 || task.trim().length > 200;

  return (
    <div className="container">
      {/* Видео фоновое */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src={videoFile} type="video/mp4" />
      </video>

      <div className="card">
        <h1>To-Do List</h1>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Введите задачу"
        />
        <button
          onClick={handleAddTask}
          disabled={isAddButtonDisabled}
        >
          Добавить
        </button>
        <ul>
          {tasks.map((t, index) => (
            <li key={index}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
