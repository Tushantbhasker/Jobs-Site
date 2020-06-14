var express = require("express");
var route = express.Router();
var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

var jobController = require("../controller/job");

// Adding a job by employer
route.get("/employer/:id/jobs/new", isEmployerLogin, jobController.adding_job);
route.post("/employer/:id/jobs/new", isEmployerLogin, jobController.adding_job_post);

function isEmployerLogin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/loginEmployer");
}
module.exports = route;