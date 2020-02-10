var express = require("express");
var route = express.Router();
var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

route.get("/employer/:id", isEmployerLogin, function(req,res){
    Employer.findById(req.params.id).populate("jobs").exec(function(err,employer){
        if(err){
            console.log(err);
        }
        else{
            res.render("employer/page", {employer: employer});
        }
    });
});
// Auth routes  for Employer=====
route.get("/registeEmployer",function(req,res){
    res.render("employer/register")
});
route.post("/registeEmployer", function(req,res){
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
});
// Login routes for Employer======
route.get("/loginEmployer", function(req,res){
   res.render("employer/login");
});
// app.post("/loginEmployer", passport.authenticate("local" ,{
//     successRedirect: "/employer/",
//     failureRedirect: "/loginEmployer"
// }),function(req,res){
// });
route.post('/loginEmployer', function(req, res, next) {
   passport.authenticate('Employer', {failureFlash:true}, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
   req.logIn(user, function(err) {
     if (err) { return next(err); }
    return res.redirect("/employer/" + user._id);
  });
 })(req, res, next);
 });

 route.get("logoutEmployer", function(req,res){
   req.logout();
   res.redirect("/");
});
// All who applied for job
route.get("/employer/job/:id", function(req,res){
    Job.findById(req.params.id).populate("appliedBy").exec(function(err,job){
        if(err){
            console.log(esrr);
        }
        else{
            console.log(job)
            res.render("employer/allCandidates",{employees:job.appliedBy});
        }
    });
});



//Middleware for Employer
function isEmployerLogin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/loginEmployer");
}
module.exports = route;