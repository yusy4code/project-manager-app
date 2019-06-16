const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: Number
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    employeeId: {
      type: Number
    }
  },
  { collection: "users" }
);

const User = (module.exports = mongoose.model("User", userSchema));
