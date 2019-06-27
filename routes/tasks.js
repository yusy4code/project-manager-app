const express = require("express");
const router = express.Router();

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

/*
router.get("/:userid", (req, res) => {
  let userid = parseInt(req.params.userid);
  let query = { userID: userid };

  User.find(query, (err, data) => {
    if (err) {
      res.json({ success: false, message: "Error while getting records" });
    } else {
      if (data.length > 0) {
        res.json({ success: true, data: data });
      } else {
        res.json({ success: false, message: "User Not found" });
      }
    }
  });
});
*/

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

        console.log(req.body, taskid);

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



/*
router.put("/:userid", (req, res) => {
  let user_id = parseInt(req.params.userid);
  let query = { userId: user_id };

  let userObj = {
    userId: user_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    employeeId: req.body.employeeId
  };

  User.findOneAndUpdate(query, userObj, (err, data) => {
    if (err) {
      return res.json({ success: false, message: "User Not Found" });
    } else {
      res.json({ success: true, message: "User updated successfully" });  
    }
  });
});

*/

/* 
router.delete("/:userid", (req, res) => {
  
  let user_id = parseInt(req.params.userid);
  let query = { userId: user_id};
  User.deleteOne(query, err => {
    if (err) {
      return res.json({success:false, message:"User Not Found"});
    }
    else {
      res.json({ success: true, message: "User deleted successfully" });
    }
  })
});
*/

module.exports = router;
