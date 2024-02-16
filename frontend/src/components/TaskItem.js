// TaskItem.js
import React from "react";

const TaskItem = ({ task, toggleCompletion, deleteTask }) => {
  return (
    <li className="list-group-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button
        className={`btn ${task.completed ? "btn-success" : "btn-warning"}`}
        onClick={() => toggleCompletion(task.id, task.completed)}
      >
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
      <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
