const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    if (err)
      return res.json({
        success: false,
        message: "Error while getting records"
      });
    else res.json({success:true, data:data});
  });
});

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

router.post("/new", (req, res) => {
  User.findOne()
    .sort("-userId")
    .exec((err, data) => {
      if (err) return res.json({ success: false, message: "User not created" });
      else {
        if (data == null) {
          var userid = 1;
        } else {
          var userid = data.userId + 1;
        }

        console.log(req.body, userid);

        let user_obj = {
          userId: userid,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          employeeId: req.body.employeeId
        };

        User.create(user_obj, err => {
          if (err) {
            console.log(user_obj);
            console.log(err);
            return res.json({ success: false, message: "User not created" });
          }
          else res.json({ success: true, message: "User Created" });
        });
      }
    });
});

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

module.exports = router;
