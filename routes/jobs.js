var express = require("express");
var route = express.Router();
var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

// Adding a job by employer
route.get("/employer/:id/jobs/new", isEmployerLogin, function(req,res){
    Employer.findById(req.params.id, function(err, employer){
        if(err){
            console.log(err);
        }
        else{
            res.render("jobs/new",{employer:employer});
        }
    });
});
route.post("/employer/:id/jobs/new", isEmployerLogin, function(req,res){
   Employer.findById(req.params.id, function(err, employer){
       if(err){
           console.log(err);
       }
       else{
           Job.create(req.body.job, function(err, job){
               if(err){
                   console.log(err);
               }
               else{
                   employer.jobs.push(job);
                   employer.save();
                   res.redirect("/employer/"+employer._id);
               }
           });
       }
   });
});

function isEmployerLogin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/loginEmployer");
}
module.exports = route;