const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  updatedDate: {
    type: String,
    required: true,
  },
  
  creatorUserID: {
    type: String,
  },
});

module.exports = mongoose.model("task", taskSchema);
