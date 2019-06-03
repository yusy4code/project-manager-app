const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    if (err) return res.json({ success: false });
    else res.json({ success: true, data: data });
  });
});

router.post("/new", (req, res) => {
  let user_obj = {
    UserID: 1,
    FirstName: "Mohammed",
    LastName: "Yusuf",
    EmployeeID: 266549
  };
  User.create(user_obj, err => {
    if (err) return res.json({ success: false });
    else res.json({ success: true });
  });
});

module.exports = router;
