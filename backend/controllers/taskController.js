// controllers/taskController.js
const Task = require("../models/Task");

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve tasks" });
    }
  },

  createTask: async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }
    try {
      console.log("Adding task to the database...");
      const [taskId] = await Task.createTask(title, description);
      console.log("Task added successfully");
      res.json({ id: taskId, title, description, completed: false });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Failed to add task" });
    }
  },

  updateTaskStatus: async (req, res) => {
    const taskId = req.params.id;
    const { completed } = req.body;
    if (completed === undefined) {
      return res.status(400).json({ error: "Completed status is required" });
    }
    try {
      await Task.updateTaskStatus(taskId, completed);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task status" });
    }
  },

  deleteTask: async (req, res) => {
    const taskId = req.params.id;
    try {
      await Task.deleteTask(taskId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  },
};

module.exports = taskController;
