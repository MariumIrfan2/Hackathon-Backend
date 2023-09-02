const express = require("express");
const route = express.Router();
const { sendResponse } = require("../helper/helper");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const AuthController = require("../controllers/authController");
const UserController = require("../controllers/userController");


route.get("/", UserController.getUser);
route.get("/:id", UserController.getUserById);
route.post("/", UserController.createUser);
route.put("/", UserController.editUser);
route.delete("/:id", UserController.editUser);


route.post("/signup", AuthController.signup );
route.post("/login", AuthController.login);
route.get("/test", AuthController.protected, (req, res) => {
  res.send("/User Valid");
});


module.exports = route;
