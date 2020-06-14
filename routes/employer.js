var express = require("express");
var route = express.Router();
var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

var employerController = require("../controller/employer");

route.get("/employer/:id", isEmployerLogin, employerController.employer);

// Auth routes  for Employer=====
route.get("/registeEmployer", employerController.employer_register);
route.post("/registeEmployer", employerController.employer_register_post);

// Login routes for Employer======
route.get("/loginEmployer", employerController.employer_login);
route.post('/loginEmployer', employerController.employer_login_post);

 route.get("logoutEmployer", employerController.employer_logout);

// All who applied for job
route.get("/employer/job/:id", employerController.employer_who_applied);



//Middleware for Employer
function isEmployerLogin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/loginEmployer");
}
module.exports = route;