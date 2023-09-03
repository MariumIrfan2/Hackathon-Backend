const { sendResponse } = require("../helper/helper");
const taskModel = require("../models/taskModel");

const TaskController = {
    getTask: async (req, res) => {
        try {
            const result = await taskModel.find();
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(404);
            } else {
                res.send(sendResponse(true, result)).status(200);
            }
        } catch (e) {
            console.log(e);
            res.send(sendResponse(false, null, "Internal Server Error")).status(400);
        }
    },
    getTaskById: async (req, res) => {
        try {
            let id = req.params.id;
            const result = await taskModel.findById(id);
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(404);
            } else {
                res.send(sendResponse(true, result)).status(200);
            }
        } catch (e) {
            console.log(e);
            res.send(sendResponse(false, null, "Internal Server Error")).status(400);
        }
    },
    
    createTask: async (req, res) => {
        let { title, description, dueDate, createdDate, updatedDate, creatorUserID } = req.body;
        try {
            let errArr = [];
            if (!title) {
                errArr.push("Required: title")
            }
            if (!dueDate) {
                errArr.push("Required: dueDate")
            }
            if (errArr.length > 0) {
                res.send(sendResponse(false, errArr, null, "required All Feilds")).status(400);
                return;
            } else {
                let obj = { title, description, dueDate, createdDate, updatedDate, creatorUserID };
                let user = new taskModel(obj);
                await user.save();
                if (!user) {
                    res.send(sendResponse(false, null, "Internal Server Error")).status(400)
                } else {
                    res.send(sendResponse(true, user, "Saved Successfully")).status(200);
                }
            }
        } catch (e) {
            res.send(sendResponse(false, null, "Internal Server Error"));
        }
    },
    editTask: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await taskModel.findById(id);
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(400);
            } else {
                let updateResult = await taskModel.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                if (!updateResult) {
                    res.send(sendResponse(false, null, "Error")).status(404);
                } else {
                    res
                        .send(sendResponse(true, updateResult, "Updated Successfully"))
                        .status(200);
                }
            }
        } catch (e) {
            res.send(sendResponse(false, null, "Error")).status(400);
        }
    },
    deleteTask: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await taskModel.findById(id);
            if (!result) {
                res.send(sendResponse(false, null, "No Data on this ID")).status(404);
            } else {
                let delResult = await taskModel.findByIdAndDelete(id);
                if (!delResult) {
                    res.send(sendResponse(false, null, "Error")).status(404);
                } else {
                    res.send(sendResponse(true, null, "Deleted Successfully")).status(200);
                }
            }
        } catch (e) {
            res.send(sendResponse(false, null, "No Data on this ID")).status(404);
        }
    },
};

module.exports = TaskController;
