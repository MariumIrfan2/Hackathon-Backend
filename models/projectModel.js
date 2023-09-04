const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
 startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  creatorUserID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("project", projectSchema);
