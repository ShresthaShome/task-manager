import { useState, useEffect } from "react";
import "./App.css";
import "./assets/css/style.css";
import Slot from "./components/Slot";

function App() {
  const cleanTask = {
    title: "",
    description: "",
    lastDate: new Date().toISOString().split("T")[0],
    priority: "",
    status: "To-Do",
  };

  const [task, setTask] = useState(cleanTask);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (Object.values(task).some((value) => !value.trim())) return;

    const newTasks = [...tasks, task];

    setTasks(newTasks);
    //setTask(cleanTask);
  };

  const handleDelete = (i) => {
    setTasks((prevTasks) => prevTasks.filter((_, id) => id !== i));
  };

  const handleSave = (i) => {
    return (x) => {
      setTasks((prevTasks) =>
        prevTasks.map((task, id) => (id === i ? { ...x } : task))
      );
    };
  };

  return (
    <main>
      <h1>Task Manager</h1>
      <h2>Add New Task</h2>
      <form onSubmit={addTask} className="form">
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Enter a title..."
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={task.description}
            rows={1}
            cols={18}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Enter description..."
            required
          />
        </div>
        <div>
          <label htmlFor="lastDate">Last Date: </label>
          <input
            type="date"
            id="lastDate"
            value={task.lastDate}
            onChange={(e) => setTask({ ...task, lastDate: e.target.value })}
            placeholder="Enter a last date..."
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority: </label>
          <select
            id="priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            required
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>

      {!!tasks.length && <h2>Your Tasks</h2>}
      <ul>
        {tasks.map((t, i) => (
          <Slot
            key={i}
            iTask={t}
            onDelete={() => handleDelete(i)}
            setTasks={handleSave(i)}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
