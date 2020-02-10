var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose"); 
var expressSessions = require("express-session");
var path = require("path");
//MODELS
var Employer = require("./models/employer");
var Employee = require("./models/employee");
var Job = require("./models/job");

const uri = "mongodb+srv://job_site:job_site@cluster0-4pztr.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect("mongodb://localhost/jobs_site");
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true});
var app = express();
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSessions({
    secret: "This is a Jobs Site",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/cofigPassport")(passport);
app.use(bodyParser.urlencoded({extended: true}));  

var employerRoutes = require("./routes/employer.js");
var employeeRoutes = require("./routes/employee.js");
var jobsRoutes = require("./routes/jobs.js");


app.get("/", function(req,res){
    res.render("landing");
});
app.use(employerRoutes);
app.use(employeeRoutes);
app.use(jobsRoutes);

app.listen("3000", function(){
    console.log("Started");
});