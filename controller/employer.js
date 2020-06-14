var express = require("express");
var route = express.Router();
var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

exports.employer = function(req,res){
    Employer.findById(req.params.id).populate("jobs").exec(function(err,employer){
        if(err){
            console.log(err);
        }
        else{
            res.render("employer/page", {employer: employer});
        }
    });
};

exports.employer_register = function(req,res){
    res.render("employer/register")
};
exports.employer_register_post = function(req,res){
    Employer.register(new Employer({username: req.body.username}) , req.body.password, function(err, employer){
        if(err){
            console.log(err);
            res.render("employer/register");
        }
        else {
            passport.authenticate("local")(req,res,function(){
                console.log(employer._id);
                res.redirect("/employer/" + employer._id);
            });
        }
    });
};

exports.employer_login = function(req,res){
    res.render("employer/login");
 };

 exports.employer_login_post = function(req, res, next) {
    passport.authenticate('Employer', {failureFlash:true}, function(err, user, info) {
     if (err) { return next(err); }
     if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
     return res.redirect("/employer/" + user._id);
   });
  })(req, res, next);
};

 exports.employer_logout = function(req,res){
    req.logout();
    res.redirect("/");
 };

 exports.employer_who_applied = function(req,res){
    Job.findById(req.params.id).populate("appliedBy").exec(function(err,job){
        if(err){
            console.log(esrr);
        }
        else{
            console.log(job)
            res.render("employer/allCandidates",{employees:job.appliedBy});
        }
    });
};
