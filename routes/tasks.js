const express = require("express");
const router = express.Router();
const moment = require('moment');

const Task = require("../models/task");


router.get("/", (req, res) => {
  Task.find({}, (err, data) => {
    if (err)
      return res.json({
        success: false,
        message: "Error while getting records"
      });
    else res.json({success:true, data:data});
  });
});


router.put("/:id", (req, res) => {
  let task_id = parseInt(req.params.id);
  let query = { taskId: task_id };

  let taskObj = {
    taskId: task_id,
    projectTitle: req.body.projectTitle,
    taskName: req.body.taskName,
    parentTask: req.body.parentTask,
    priority: req.body.priority,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    assignedTo: req.body.assignedTo,
    isCompleted: false
  };


  Task.findOneAndUpdate(query, taskObj, (err, data) => {
    if (err) return res.json({ success: false, message: "Task Not Found" });
    res.json({ success: true, message: "Task saved successfully" });
  });
});

router.get("/:taskid", (req, res) => {
  let taskid = parseInt(req.params.taskid);
  let query = { taskId: taskid };

  Task.find(query, (err, data) => {
    if (err) {
      res.json({ success: false, message: "Error while getting records" });
    } else {
      if (data.length > 0) {
        res.json({ success: true, data: data });
      } else {
        res.json({ success: false, message: "Task Not found" });
      }
    }
  });
});

router.put("/end/:id", (req, res) => {
  let task_id = parseInt(req.params.id);
  let query = { taskId: task_id };
  
  let today = moment().format("YYYY-MM-DD");
  let updatedData = {isCompleted: true, endDate: today};
  console.log
  Task.updateOne(query, updatedData, (err, data) => {
    if (err) return res.json({ success: false, message: "Task Not Found" });
    res.json({ success: true, message: "Task ended successfully" });
  });
});

router.post("/new", (req, res) => {
  Task.findOne()
    .sort("-taskId")
    .exec((err, data) => {
      if (err) return res.json({ success: false, message: "Task not created" });
      else {
        if (data == null) {
          var taskid = 1;
        } else {
          var taskid = data.taskId + 1;
        }

        //console.log(req.body, taskid);

        let task_obj = {
          taskId: taskid,
          projectTitle: req.body.projectTitle,
          taskName: req.body.taskName,
          parentTask: req.body.parentTask,
          priority: req.body.priority,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          assignedTo: req.body.assignedTo,
          isCompleted: false
        };

        Task.create(task_obj, err => {
          if (err) {
            console.log(task_obj);
            console.log(err);
            return res.json({ success: false, message: "Task not created" });
          }
          else res.json({ success: true, message: "Task Created" });
        });
      }
    });
});

module.exports = router;
