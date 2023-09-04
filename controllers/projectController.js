const { sendResponse } = require("../helper/helper");
const projectModel = require("../models/projectModel");

const ProjectController = {
    getProject: async (req, res) => {
        try {
            const result = await projectModel.find();
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(404);
            } else {
                res.send(sendResponse(true, result)).status(200)
            }
        } catch (e) {
            console.log(e);
            res.send(sendResponse(false, null, "Internal Server Error")).status(400);
        }
    },
    getProjectById: async (req, res) => {
        try {
            let id = req.params.id;
            const result = await projectModel.findById(id);
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
    createProject: async (req, res) => {
        let { projectName, description, startDate, endDate, creatorUserID } =
            req.body;
        try {
            let errArr = [];
            if (!projectName) {
                errArr.push("Required ProjectName");
            }
            if (!description) {
                errArr.push("Required description");
            }
            if (!startDate) {
                errArr.push("Required startDate");
            }
            if (!endDate) {
                errArr.push("Required endDate");
            }
            if (!creatorUserID) {
                errArr.push("Required creatorUserID");
            }
            if (errArr.length > 0) {
                res
                    .send(sendResponse(false, errArr, null, "Required All Fields"))
                    .status(400);
                return;
            } else {
                let obj = {
                    projectName,
                    description,
                    startDate,
                    endDate,
                    creatorUserID,
                };
                let Project = new projectModel(obj);
                await Project.save();
                if (!Project) {
                    res.send(sendResponse(false, null, "Data Not Found")).status(404);
                } else {
                    res.send(sendResponse(true, Project, "Save Successfully")).status(200);
                }
            }
        } catch (e) {
            console.log(e);
            res.send(sendResponse(false, null, "Internal Server Error")).status(400);
        }
    },
    editProject: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await projectModel.findById(id);
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(400);
            } else {
                let updateResult = await projectModel.findByIdAndUpdate(id, req.body, {
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
    deleteProject: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await projectModel.findById(id);
            if (!result) {
                res.send(sendResponse(false, null, "No Data on this ID")).status(404);
            } else {
                let delResult = await projectModel.findByIdAndDelete(id);
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

module.exports = ProjectController;
