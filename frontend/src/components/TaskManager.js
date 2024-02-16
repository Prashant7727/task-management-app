// TaskManager.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const addTask = async (title, description) => {
    try {
      await axios.post("http://localhost:5000/tasks", { title, description });
      fetchTasks();
    } catch (error) {
      setError("Failed to add task. Please try again later.");
    }
  };

  const toggleCompletion = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        completed: !completed,
      });
      fetchTasks();
    } catch (error) {
      setError("Failed to update task status. Please try again later.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      setError("Failed to delete task. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-3">Task Manager</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleCompletion={toggleCompletion}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskManager;
