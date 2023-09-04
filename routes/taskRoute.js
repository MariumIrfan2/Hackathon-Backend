const express = require("express");
const route = express.Router();
const TaskController = require("../controllers/taskController");


route.get("/", TaskController.getTask);
route.get("/:id", TaskController.getTaskById);
route.post("/", TaskController.createTask);
route.put("/", TaskController.editTask);
route.delete("/:id", TaskController.deleteTask);



module.exports = route;
