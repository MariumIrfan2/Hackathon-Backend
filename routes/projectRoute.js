const express = require("express");
const route = express.Router();
const ProjectController = require("../controllers/projectController");


route.get("/", ProjectController.getProject);
route.get("/:id", ProjectController.getProjectById);
route.post("/", ProjectController.createProject);
route.put("/", ProjectController.editProject);
route.delete("/:id", ProjectController.deleteProject);

module.exports = route;
