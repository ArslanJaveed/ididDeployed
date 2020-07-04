let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let taskSchema = require("../models/Student");

// CREATE Student
router.route("/create-student").post((req, res, next) => {
  taskSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Students
router.route("/:username").get((req, res) => {
  taskSchema.find({employeeName: req.params.username},(error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(req.params.username);
      res.json(data);
    }
  });
});

// Get Single Student
router.route("/edit-student/:id").get((req, res) => {
  taskSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Student
router.route("/update-student/:id").put((req, res, next) => {
  taskSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

// Delete Student
router.route("/delete-student/:id").delete((req, res, next) => {
  taskSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

module.exports = router;
