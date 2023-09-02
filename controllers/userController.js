const { sendResponse } = require("../helper/helper");
const userModel = require("../models/userModel");

const UserController = {
    getUser: async (req, res) => {
        try {
            const result = await userModel.find();
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
    getUserById: async (req, res) => {
        try {
            let id = req.params.id;
            const result = await userModel.findById(id);
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
    searchUser: async (req, res) => {

        let { firstName, lastName } = req.body;
        if (firstName) {
            let result = await userModel.find({
                firstName: firstName,
                lastName: lastName,
            });
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(404);
            } else {
                res.send(sendResponse(true, result)).status(200);
            }
        }
    },
    createUser: async (req, res) => {
        let { firstName, lastName, email, password, contact } = req.body;
        try {
            let errArr = [];

           
            if (!userName) {
                errArr.push("Required: last Name")
            }
            if (!email) {
                errArr.push("Required: Email")
            }
            if (!password) {
                errArr.push("Required: Password")
            }
            if (errArr.length > 0) {
                res.send(sendResponse(false, errArr, null, "required All Feilds")).status(400);
                return;
            } else {
                let obj = { userName, email, password };
                let user = new userModel(obj);
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
    editUser: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await userModel.findById(id);
            if (!result) {
                res.send(sendResponse(false, null, "No Data Found")).status(400);
            } else {
                let updateResult = await userModel.findByIdAndUpdate(id, req.body, {
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
    deleteUser: async (req, res) => {
        try {
            let id = req.params.id;
            let result = await userModel.findById(id);
            if (!result) {
                res.send(sendResponse(false, null, "No Data on this ID")).status(404);
            } else {
                let delResult = await userModel.findByIdAndDelete(id);
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
    searchWithPagination: async (req, res) => {
        try {
            let { pageNo, pageSize, searchBy, searchVal } = req.body;

            let result = await userModel
                .find({ [searchBy]: searchVal })
                .skip((pageNo - 1) * pageSize)
                .limit(pageSize);
            if (result) {
                let count = await userModel.countDocuments();
                req.headers.recCount = count;
                res.send({ ...sendResponse(true, result), count: count });
            } else {
                res.send(sendResponse(false, null, "No Data Found"));
            }
        } catch (e) { }
    },
};

module.exports = UserController;
