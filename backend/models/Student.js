const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema(
  {
    employeeName: {
      type: String
    },
    task: [{
      
    }],
    created: {
      type: String
    },
    checkIn: {
      type: Boolean
    },
    checkOut: {
      type: Boolean
    },
    checkInTime: {
      type: String
    },
    checkOutTime: {
      type: String
    }
  },
  {
    collection: "tasks"
  }
);

module.exports = mongoose.model("Task", taskSchema);
