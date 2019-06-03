const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskId: {
      type: Number
    },
    projectTitle: {
      type: String
    },
    taskName: {
      type: String
    },
    parentTask: {
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
    assignedTo: {
      type: String
    },
    isCompleted: {
      type: Boolean
    }
  },
  { collection: "tasks" }
);

const Task = (module.exports = mongoose.model("Task", taskSchema));
