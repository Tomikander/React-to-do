import { useState } from "react";
import './App.css';
import videoFile from './assets/background.mp4';

function App() {
  const [currentTaskValue, setCurrentTaskValue] = useState("");
  const [taskList, setTaskList] = useState([]); 
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (e) => {
    setCurrentTaskValue(e.target.value);
  };

  // Обработчик добавления или сохранения задачи
  const handleAddOrUpdateTask = () => {
    if (currentTaskValue.trim().length >= 3 && currentTaskValue.trim().length <= 200) {
      if (editTaskIndex !== null) {
        const updatedTaskList = taskList.map((task, index) =>
          index === editTaskIndex ? { ...task, value: currentTaskValue } : task
        );
        setTaskList(updatedTaskList);
        setEditTaskIndex(null);
      } else {
        setTaskList([...taskList, { value: currentTaskValue, completed: false }]);
      }
      setCurrentTaskValue("");
    }
  };

  // Обработчик удаления задачи
  const handleDeleteTask = (index) => {
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
  };

  // Обработчик редактирования задачи
  const handleEditTask = (index) => {
    setCurrentTaskValue(taskList[index].value);
    setEditTaskIndex(index);
  };

  // Обработчик выполнения задачи
  const handleTaskCompletion = (index) => {
    const completedTask = taskList[index];
    const updatedTaskList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTaskList);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  // Проверка на валидность поля ввода
  const isButtonDisabled = currentTaskValue.trim().length < 3 || currentTaskValue.trim().length > 200;

  return (
    <div className="container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="card">
        <h1 className="header">To-Do List</h1>
        <input
          className="input-task"
          type="text"
          value={currentTaskValue}
          onChange={handleInputChange}
          placeholder="Введите задачу"
        />
        <button
          className="add-btn"
          onClick={handleAddOrUpdateTask}
          disabled={isButtonDisabled}
        >
          {editTaskIndex !== null ? "Сохранить" : "Добавить"}
        </button>

        <ul className="task-list">
          {taskList.map((task, index) => (
            <li className="task-item" key={index}>
              <input
                className="checkbox"
                type="checkbox"
                onChange={() => handleTaskCompletion(index)}
              />
              <span className="task-text">{task.value}</span>
              <button
                className="edit-btn"
                onClick={() => handleEditTask(index)}
                disabled={currentTaskValue !== ""}
                title={currentTaskValue !== "" ? "Очистите поле ввода" : ""}
              >
                Редактировать
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(index)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>

        {/* Список выполненных задач */}
        {completedTasks.length > 0 && (
          <>
            <h2>Готово</h2>
            <ul className="completed-task-list">
              {completedTasks.map((task, index) => (
                <li className="task-item" key={index}>
                  <span className="completed-task-text">{task.value}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
