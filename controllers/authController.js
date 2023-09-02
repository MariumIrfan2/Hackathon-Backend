const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const { sendResponse } = require("../helper/helper");
const jwt = require("jsonwebtoken");

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const obj = { email, password };
    console.log(obj);
    let result = await userModel.findOne({ email });
    if (result) {
      let isConfirm = await bcrypt.compare(obj.password, result.password);
      if (isConfirm) {
        let token = jwt.sign({ ...result }, process.env.SECURE_KEY, {
          expiresIn: "24h",
        });
        res.send(
          sendResponse(true, { user: result, token }, "Login Successfully")
        );
      } else {
        res.send(sendResponse(false, null, "Credential Error"));
      }
    } else {
      res.send(sendResponse(false, err, "User Doesn't Exist"));
    }
  },
  signup: async (req, res) => {
    const { userName, email, password } = req.body;
    const obj = { userName, email, password };
    let requiredArr = ["userName", "email", "password"];
    let errArr = [];

    requiredArr.forEach((x) => {
      if (!obj[x]) {
        errArr.push(x);
      }
    });

    if (errArr.length > 0) {
      res
        .send(sendResponse(false, null, "Some Fileds are Missing", errArr))
        .status(400);
      return;
    } else {
      let hashPassword = await bcrypt.hash(obj.password, 10);
      obj.password = hashPassword;

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        res
          .send(sendResponse(false, null, "This Email is Already Exist"))
          .status(403);
      } else {
        userModel.create(obj)
          .then((result) => {
            res.send(sendResponse(true, result, "User Saved Successfully"));
          })
          .catch((err) => {
            res
              .send(sendResponse(false, err, "Internal Server Error"))
              .status(400);
          });
      }
    }
  },
  protected: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
        if (err) {
          res.send(sendResponse(false, null, "Unauthorized")).status(403);
        } else {
          console.log(decoded);
          next();
        }
      });
    } else {
      res.send(sendResponse(false, null, "Unauthorized")).status(403);
    }
  },
  adminProtected: async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
      if (err) {
        res.send(sendResponse(false, null, "Unauthorized")).status(403);
      } else {
        if (decoded._doc.isAdmin) {
          next();
        } else {
          res
            .send(sendResponse(false, null, "You Have Rights for this Action"))
            .status(403);
        }
      }
    });
  },
};
module.exports = AuthController;
