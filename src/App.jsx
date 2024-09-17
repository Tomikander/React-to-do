import { useState } from "react";
import './App.css';
import videoFile from './assets/background.mp4';

function App() {
  const [task, setTask] = useState(""); // Значение поля ввода
  const [tasks, setTasks] = useState([]); // Список задач
  const [editIndex, setEditIndex] = useState(null); // Индекс редактируемого элемента

  // Обработчик изменения поля ввода
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Обработчик добавления или сохранения задачи
  const handleAddOrUpdateTask = () => {
    if (task.trim().length >= 3 && task.trim().length <= 200) {
      if (editIndex !== null) {
        // Обновление существующей задачи
        const updatedTasks = tasks.map((t, index) =>
          index === editIndex ? task : t
        );
        setTasks(updatedTasks);
        setEditIndex(null); // Сброс режима редактирования
      } else {
        // Добавление новой задачи
        setTasks([...tasks, task]);
      }
      setTask(""); // Очистка поля ввода
    }
  };

  // Обработчик удаления задачи
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Обработчик редактирования задачи
  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index); // Установка индекса редактируемого элемента
  };

  // Проверка на валидность поля ввода
  const isButtonDisabled = task.trim().length < 3 || task.trim().length > 200;

  return (
    <div className="container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
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
          onClick={handleAddOrUpdateTask}
          disabled={isButtonDisabled}
        >
          {editIndex !== null ? "Сохранить" : "Добавить"}
        </button>
<ul>
  {tasks.map((t, index) => (
    <li key={index}>
      <input type="checkbox" />
      {t}
      <button onClick={() => handleEditTask(index)}>Редактировать</button>
      <button onClick={() => handleDeleteTask(index)}>Удалить</button>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}

export default App;
