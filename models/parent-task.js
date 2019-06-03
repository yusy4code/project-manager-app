const mongoose = require("mongoose");

const parentTaskSchema = mongoose.Schema(
  {
    parentID: {
      type: Number
    },
    parentTask: {
      type: String
    }
  },
  { collection: "parent-task" }
);

const ParentTask = (module.exports = mongoose.model(
  "ParentTask",
  parentTaskSchema
));
