import express from "express";
import mongoose from "mongoose";
import Task from "./task.model.js";

// Docker Run Command
// MongoDB Container
// docker run -d -p 27017:27017 --name task-manager-mongodb -v task-manager-mongodb-data:/data/db
//  // --network task-manager-network mongodb/mongodb-community-server:8.0-ubi9-slim

// Backend Container
// docker run -d -p 3000:3000 --name task-manager-backend --network task-manager-network -e PORT=3000
//  // -e MONGODB_URI="mongodb://task-manager-mongodb:27017/task-manager" -v ${PWD}/src:/app/src
//  //  task-manager-backend:1.1.0 node --watch src/server.js

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/task-manager";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(PORT, () => {
  console.clear();
  console.log(`Server running on port ${PORT} . . . `);
});

// Functions
const responseSuccess = (res, data, message, status = 200) => {
  res.status(status).json({ data: data, message: message });
};

const responseError = (res, message) => {
  res.status(400).json({ message: message });
};

// APIs
app.get("", (req, res) => {
  res.json({ message: "Welcome to the Task Manager App" });
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    responseSuccess(res, tasks, "Successfully fetched tasks");
  } catch (error) {
    responseError(res, "Error fetching tasks");
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return responseError(res, "Task not found");
    responseSuccess(res, task, "Successfully fetched task");
  } catch (error) {
    responseError(res, "Error fetching task");
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({ title: req.body.title });
    responseSuccess(res, newTask, "Successfully created new task", 201);
  } catch (error) {
    responseError(res, "Error creating task");
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, updated_at: new Date() },
      { returnDocument: "after" },
    );
    if (!task) return responseError(res, "Task not found");
    responseSuccess(res, task, "Successfully updated task");
  } catch (error) {
    responseError(res, "Error updating task");
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "Completed", updated_at: new Date() },
      { returnDocument: "after" },
    );
    if (!task) return responseError(res, "Task not found");
    responseSuccess(res, task, "Successfully completed task");
  } catch (error) {
    responseError(res, "Error completing task");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return responseError(res, "Task not found");
    responseSuccess(res, task, "Successfully deleted task");
  } catch (error) {
    responseError(res, "Error deleting task");
  }
});
