let express = require("express"),
router      = express.Router();
let taskSchema = require("../models/Student");

//This returns all data from db
router.get('/admin',function(req,res){
    taskSchema.find({},function(err,data){
        if(err){
            throw err;
        } else {
            res.json(data);
        }
    });
});

//This will give admin all check in's of the day
router.get('/admin/check-in/:day/:month/:year',function(req,res){
    let date = req.params.day + "/" + req.params.month + "/" + req.params.year;
    
    taskSchema.find({created: date, checkIn: true},function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

//This will give admin all check out's of the day
router.get('/admin/check-out/:day/:month/:year',function(req,res){
    let date = req.params.day + "/" + req.params.month + "/" + req.params.year;
    taskSchema.find({created: date,checkOut: true},function(err,data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});


//This will give all dates
router.get('/admin/dates',function(req,res){
    taskSchema.distinct("created",function(err,data){
        if(err){
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;