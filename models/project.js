const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String
    },
    priority: {
      type: Number
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    projectManager: {
      type: String
    },
    status: {
      type: String
    }
  },
  { collection: "projects" }
);

const Project = (module.exports = mongoose.model("Project", projectSchema));
