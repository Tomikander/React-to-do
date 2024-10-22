import { useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid'; // Импортируем функцию для генерации уникальных идентификаторов
import './App.css';
import videoFile from './assets/background.mp4';

function App() {
  const [currentTaskValue, setCurrentTaskValue] = useState(""); // Текущее значение задачи
  const [taskList, setTaskList] = useState([]); // Список задач
  const [editTaskId, setEditTaskId] = useState(null); // Идентификатор редактируемой задачи

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (e) => {
    setCurrentTaskValue(e.target.value);
  };

  // Обработчик добавления или сохранения задачи
  const handleAddOrUpdateTask = () => {
    if (currentTaskValue.trim().length >= 3 && currentTaskValue.trim().length <= 200) {
      if (editTaskId !== null) {
        const updatedTaskList = taskList.map(task =>
          task.id === editTaskId ? { ...task, value: currentTaskValue } : task
        );
        setTaskList(updatedTaskList);
        setEditTaskId(null);
      } else {
        setTaskList([...taskList, { id: uuidv4(), value: currentTaskValue, completed: false }]);
      }
      setCurrentTaskValue("");
    }
  };

  // Обработчик удаления задачи
  const handleDeleteTask = (id) => {
    const updatedTaskList = taskList.filter(task => task.id !== id);
    setTaskList(updatedTaskList);
  };

  // Обработчик редактирования задачи
  const handleEditTask = (id) => {
    const taskToEdit = taskList.find(task => task.id === id);
    setCurrentTaskValue(taskToEdit.value);
    setEditTaskId(id);
  };

  // Обработчик выполнения задачи (выбор чекбокса)
  const handleTaskCompletion = (id) => {
    const updatedTaskList = taskList.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTaskList);
  };

  // Мемоизация списка невыполненных задач
  const pendingTasks = useMemo(
    () => taskList.filter(task => !task.completed),
    [taskList]
  );

  // Мемоизация списка выполненных задач
  const completedTasks = useMemo(
    () => taskList.filter(task => task.completed),
    [taskList]
  );

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
          {editTaskId !== null ? "Сохранить" : "Добавить"}
        </button>

        {/* Список невыполненных задач */}
        <ul className="task-list">
          {pendingTasks.map(task => (
            <li className="task-item" key={task.id}>
              <input
                className="checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(task.id)}
              />
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.value}</span>
              <button
                className="edit-btn"
                onClick={() => handleEditTask(task.id)}
                disabled={currentTaskValue !== ""}
                title={currentTaskValue !== "" ? "Очистите поле ввода" : ""}
              >
                Редактировать
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task.id)}
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
              {completedTasks.map(task => (
                <li className="task-item" key={task.id}>
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
