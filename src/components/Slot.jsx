import { useState } from "react";

export default function Slot({ iTask, onDelete, setTasks }) {
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(iTask);

  const saveTask = (e) => {
    e.preventDefault();
    if (Object.values(task).some((value) => !value.trim())) return;

    setEdit(false);
    setTasks(task);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const onSlotClick = () => {
    const newTask = {
      ...task,
      status: `${task.status === "Completed" ? "To-Do" : "Completed"}`,
    };
    setTasks(newTask);
    setTask(newTask);
  };

  return (
    <div>
      <div style={{ display: `${!edit ? "block" : "none"}` }}>
        <div onClick={onSlotClick}>
          <strong>{task.title}</strong> -{" "}
          {task.description.length > 50
            ? `${task.description.substring(0, 50)}...`
            : task.description}{" "}
          (Status: {task.status})
        </div>
        <div>
          <button disabled={edit} onClick={handleEdit}>
            Edit
          </button>
          <button onClick={onDelete}>X</button>
        </div>
      </div>

      <form
        onSubmit={saveTask}
        style={{ display: `${edit ? "block" : "none"}` }}
      >
        <div>
          <label htmlFor="etitle">Edit title: </label>
          <input
            type="text"
            id="etitle"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Enter a title..."
            required
          />
        </div>
        <div>
          <label htmlFor="edescription">Edit description: </label>
          <textarea
            id="edescription"
            value={task.description}
            rows={1}
            cols={18}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Enter description..."
            required
          />
        </div>
        <div>
          <label htmlFor="elastDate">Edit last date: </label>
          <input
            type="date"
            id="elastDate"
            value={task.lastDate}
            onChange={(e) => setTask({ ...task, lastDate: e.target.value })}
            placeholder="Enter a last date..."
            required
          />
        </div>
        <div>
          <label htmlFor="epriority">Edit priority: </label>
          <select
            id="epriority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Edit status: </label>
          <select
            id="status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            required
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <button type="submit">Save</button>
          <button onClick={onDelete}>X</button>
        </div>
      </form>
    </div>
  );
}
