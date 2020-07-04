let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let cron = require("node-cron");
let ejs = require("ejs");
let path = require("path");
let nodemailer = require("nodemailer");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");

let taskSchema = require("./models/Student");

// Express Route
const studentRoute = require("../backend/routes/student.routes");

let date_ob = new Date();

let date = date_ob.getDate();
let month = ((date_ob.getMonth() + 1));
let year = date_ob.getFullYear();

let fulldate = month + "/" + date + "/" + + year;
console.log(fulldate);

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    error => {
      console.log("Could not connect to database : " + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname,"client/build")));
app.use(cors());

var tasks;

let transporter = nodemailer.createTransport({

  service: "gmail",
  auth: {
    user: "ididapp383@gmail.com",
    pass:"Brandpa383"
  }
});



// cron job configured to send checkin email at 1pm everyday
cron.schedule("0 13 * * *",function(){
  console.log("running cron job");

  taskSchema.find({checkIn: true, created: fulldate},function(err,taskData){
    if(err){
      console.log(err);
    } else {
      tasks=taskData;
    }
  });
  
  setTimeout(()=>{
  
    ejs.renderFile("emailTemplate.ejs",{tasks:tasks},function(err,data){
      
      if (err){
        console.log(err);
      } else {
        var mailOptions = {
          from:"IDID Application",
          to:"ididtoday@brandpa.pk",
          subject:"Employee Data",
          html: data
        };
    
        console.log("html data sent in template is",mailOptions.html);
        transporter.sendMail(mailOptions,function(err,info){
          if(err){
            console.log(err);
          } else {
            console("email sent successfully");
          }
        });
      }
    });
  },10000);

});

// cron job configured to send checkin email at 10pm everyday
cron.schedule("0 22 * * *",function(){
  console.log("running cron job");

  taskSchema.find({checkOut: true, created: fulldate},function(err,taskData){
    if(err){
      console.log(err);
    } else {
      tasks=taskData;
    }
  });

  setTimeout(()=>{

    ejs.renderFile("emailTemplate.ejs",{tasks:tasks},function(err,data){
      
      if (err){
        console.log(err);
      } else {
        var mailOptions = {
          from:"IDID Application",
          to:"ididtoday@brandpa.pk",
          subject:"Employee Data",
          html: data
        };
    
        console.log("html data sent in template is",mailOptions.html);
        transporter.sendMail(mailOptions,function(err,info){
          if(err){
            console.log(err);
          } else {
            console("email sent successfully");
          }
        });
      }
    });
  },10000);

});


app.use("/students", studentRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  next();
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
