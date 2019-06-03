const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userID: {
      type: Number
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    employeeID: {
      type: Number
    }
  },
  { collection: "users" }
);

const User = (module.exports = mongoose.model("User", userSchema));
