const express = require("express");
const router = express.Router();

const ParentTask = require("../models/parent-task");

router.get("/", (req, res) => {
  ParentTask.find({}, (err, data) => {
    if (err)
      return res.json({
        success: false,
        message: "Error while getting records"
      });
    else res.json(data);
  });
});

router.get("/:parent_id", (req, res) => {
  let parent_id = parseInt(req.params.parent_id);
  let query = { parentID: parent_id };

  ParentTask.find(query, (err, data) => {
    if (err) {
      res.json({ success: false, message: "Error while getting records" });
    } else {
      if (data.length > 0) {
        res.json({ success: true, data: data });
      } else {
        res.json({ success: false, message: "Parent Task Not found" });
      }
    }
  });
});

router.post("/new", (req, res) => {
  ParentTask.findOne()
    .sort("-parentID")
    .exec((err, data) => {
      if (err)
        return res.json({ success: false, message: "Parent Task not created" });
      else {
        if (data == null) {
          var parentID = 1;
        } else {
          var parentID = data.parentID + 1;
        }

        let parent_task = {
          parentID: parentID,
          parentTask: req.body.parentTask
        };

        ParentTask.create(parent_task, err => {
          if (err)
            return res.json({
              success: false,
              message: "Parent Task not created"
            });
          else res.json({ success: true, message: "Parent Task Created" });
        });
      }
    });
});

module.exports = router;
