import { useState, useEffect } from "react";
import "./App.css";
import "./assets/css/style.css";
import Slot from "./components/Slot";
import ThemeButton from "./components/ThemeButton";

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
  const [category, setCategory] = useState("all");

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

    const newTasks = [...tasks, { ...task, date: new Date().toISOString() }];

    setTasks(newTasks);
    setTask(cleanTask);
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

  const handleMultiDelete = () => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter(
        (_, i) => !document.getElementById(`checkbox-${i}`).checked
      );

      setTimeout(() => {
        prevTasks.forEach((_, i) => {
          const checkbox = document.getElementById(`checkbox-${i}`);
          if (checkbox) checkbox.checked = false;
        });
      }, 0);

      return newTasks;
    });
  };

  return (
    <>
      <ThemeButton />
      <main>
        <h1>Task Manager</h1>
        <h2>Add New Task</h2>
        <form onSubmit={addTask} className="form">
          <div className="add">
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
          <div className="add">
            <label htmlFor="description">Description: </label>
            <textarea
              id="description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              placeholder="Enter description..."
              required
            />
          </div>
          <div className="add">
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
          <div className="add">
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

        {!!tasks.length && (
          <>
            <h2>Your Tasks</h2>
            <label htmlFor="category">Categorize by </label>{" "}
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
            <button className="delbutton" onClick={() => handleMultiDelete()}>
              Delete Multiple
            </button>
          </>
        )}

        {category === "all" && (
          <ul>
            {tasks.map((t, i) => (
              <div key={t.date}>
                <Slot
                  id={i}
                  iTask={t}
                  onDelete={() => handleDelete(i)}
                  setTasks={handleSave(i)}
                />
              </div>
            ))}
          </ul>
        )}

        {category === "status" && (
          <>
            {tasks.some((x) => x.status === "To-Do") && (
              <>
                <h3>To-Do</h3>
                <ul>
                  {tasks
                    .map((t, i) => (
                      <div key={t.date}>
                        <Slot
                          id={i}
                          iTask={t}
                          onDelete={() => handleDelete(i)}
                          setTasks={handleSave(i)}
                        />
                      </div>
                    ))
                    .filter((_, i) => tasks[i].status === "To-Do")}
                </ul>
              </>
            )}
            {tasks.some((x) => x.status === "In Progress") && (
              <>
                <h3>In Progress</h3>
                <ul>
                  {tasks
                    .map((t, i) => (
                      <div key={t.date}>
                        <Slot
                          id={i}
                          iTask={t}
                          onDelete={() => handleDelete(i)}
                          setTasks={handleSave(i)}
                        />
                      </div>
                    ))
                    .filter((_, i) => tasks[i].status === "In Progress")}
                </ul>
              </>
            )}
            {tasks.some((x) => x.status === "Completed") && (
              <>
                <h3>Completed</h3>
                <ul>
                  {tasks
                    .map((t, i) => (
                      <div key={t.date}>
                        <Slot
                          id={i}
                          iTask={t}
                          onDelete={() => handleDelete(i)}
                          setTasks={handleSave(i)}
                        />
                      </div>
                    ))
                    .filter((_, i) => tasks[i].status === "Completed")}
                </ul>
              </>
            )}
          </>
        )}

        {category === "priority" && (
          <>
            {tasks.some((x) => x.priority === "high") && (
              <>
                <h3>High Priority</h3>
                <ul>
                  {tasks
                    .map((t, i) => (
                      <div key={t.date}>
                        <Slot
                          id={i}
                          iTask={t}
                          onDelete={() => handleDelete(i)}
                          setTasks={handleSave(i)}
                        />
                      </div>
                    ))
                    .filter((_, i) => tasks[i].priority === "high")}
                </ul>
              </>
            )}

            {tasks.some((x) => x.priority === "medium") && (
              <>
                <h3>Medium Priority</h3>
                <ul>
                  {tasks
                    .map((t, i) => (
                      <div key={t.date}>
                        <Slot
                          id={i}
                          iTask={t}
                          onDelete={() => handleDelete(i)}
                          setTasks={handleSave(i)}
                        />
                      </div>
                    ))
                    .filter((_, i) => tasks[i].priority === "medium")}
                </ul>
              </>
            )}

            {tasks.some((x) => x.priority === "low") && (
              <>
                <h3>Low Priority</h3>
                <ul>
                  {tasks
                    .map((t, i) => (
                      <div key={t.date}>
                        <Slot
                          id={i}
                          iTask={t}
                          onDelete={() => handleDelete(i)}
                          setTasks={handleSave(i)}
                        />
                      </div>
                    ))
                    .filter((_, i) => tasks[i].priority === "low")}
                </ul>
              </>
            )}
          </>
        )}
      </main>
      <footer>
        Made with ❤️ by{" "}
        <a href="https://github.com/shresthashome">
          <u>Ullas Shome</u>
        </a>
        <br />
        Copyright &copy;2025 Ullas Shome. All Rights Reserved.
      </footer>
    </>
  );
}

export default App;
