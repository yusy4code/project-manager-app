const express = require("express");
const router = express.Router();
const moment = require('moment');

const Project = require("../models/project");
const Task = require("../models/task");

router.get("/all", (req, res) => {

  Project.aggregate([
    {
      $lookup:
      {
        from:'task',
        localField: 'title',
        foreignField: 'projectTitle',
        as: 'projDetails'
      }
    },
    {
      "$project":{ title: "$title", noOfTask: {$size: "$projDetails"}}
    }
    ]).exec((err, data) => {
      console.log(data);
      res.json({success:'done'});
    });

  //Project.find({}, (err, data) => {
  //  if (err)
  //    return res.json({
  //      success: false,
  //      message: "Error while getting records"
  //    });
  //  else res.json({success:true, data:data});
  //});
});

router.get("/", (req, res) => {
  var result;
  Project.find({}, (err, data) => {
    if (err) return res.json({success:false});
    result = data;
    data.forEach((d,i) => {
      query = { projectTitle: d['title']};
      //console.log(query);
      Task.find(query, (err, taskData) => {
        result[i]._doc.noOfTask = taskData.length;
        if (i == result.length-1) {
          res.json({success:true, data:result});
        }
      });
    });
  });
});

router.get("/:projectid", (req, res) => {
  let projectid = parseInt(req.params.projectid);
  let query = { projectId: projectid };

  Project.find(query, (err, data) => {
    if (err) {
      res.json({ success: false, message: "Error while getting records" });
    } else {
      if (data.length > 0) {
        res.json({ success: true, data: data });
      } else {
        res.json({ success: false, message: "Project Not found" });
      }
    }
  });
});

router.put("/suspend/:projectid", (req, res) => {
  let projectid = parseInt(req.params.projectid);
  let query = { projectId: projectid };
  
  let today = moment().format("YYYY-MM-DD");
  let updatedData = {status: "completed", endDate: today};

  Project.updateOne(query, updatedData, (err, data) => {
    if (err) return res.json({ success: false, message: "Project Not Found" });
    res.json({ success: true, message: "Project suspended successfully" });
  });
});

router.put("/:projectid", (req, res) => {
  let projectid = parseInt(req.params.projectid);
  let query = { projectId: projectid };

  // Any of the 5 field could be updated from front end
  let updatedData = {
          title: req.body.title,
          projectManager: req.body.projectManager,
          priority: req.body.priority,
          startDate: req.body.startDate,
          endDate: req.body.endDate
        };

  Project.updateOne(query, updatedData, (err, data) => {
    if (err) return res.json({success:false, message:"Project Not found"});
    res.json({success:true, message:"Project updated successfully"});
  });
});

router.post("/new", (req, res) => {
  Project.findOne()
    .sort("-projectId")
    .exec((err, data) => {
      if (err) return res.json({ success: false, message: "Project not created" });
      else {
        if (data == null) {
          var projectid = 1;
        } else {
          var projectid = data.projectId + 1;
        }

        //console.log(req.body, projectid);

        let project_obj = {
          projectId: projectid,
          title: req.body.title,
          projectManager: req.body.projectManager,
          priority: req.body.priority,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          status: 'In-Progress'
        };

        Project.create(project_obj, err => {
          if (err) {
            //console.log(project_obj);
            console.log(err);
            return res.json({ success: false, message: "Project not created" });
          }
          else res.json({ success: true, message: "Project Created" });
        });
      }
    });
});

module.exports = router;