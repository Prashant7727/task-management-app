// TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleCompletion, deleteTask }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleCompletion={toggleCompletion}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
