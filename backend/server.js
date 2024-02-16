// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Task = require("./models/Task"); // Import Task model
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
// Create tasks table if not exists
Task.createTasksTable();

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
