// models/Task.js
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite",
  },
  useNullAsDefault: true,
});

class Task {
  static async createTasksTable() {
    try {
      await knex.schema.createTableIfNotExists("tasks", (table) => {
        table.increments("id").primary();
        table.string("title");
        table.string("description");
        table.boolean("completed").defaultTo(false);
      });
      console.log("Tasks table created");
    } catch (error) {
      console.error("Error creating tasks table:", error);
    }
  }

  static async getAllTasks() {
    return await knex("tasks").select("*");
  }

  static async createTask(title, description) {
    return await knex("tasks").insert({ title, description });
  }

  static async updateTaskStatus(id, completed) {
    return await knex("tasks").where({ id }).update({ completed });
  }

  static async deleteTask(id) {
    return await knex("tasks").where({ id }).del();
  }
}

module.exports = Task;
