var express = require("express");
var route = express.Router();
var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

var employeeController = require("../controller/employee");

route.get("/employee", isEmployeeLogin, employeeController.employee_routes);

// Auth routes for employee
route.get("/registeEmployee", employeeController.employee_register);
route.post("/registeEmployee", employeeController.employee_register_post);

// Login routes for Employee======
route.get("/loginEmployee", employeeController.employee_login);
route.post("/loginEmployee", passport.authenticate("Employee" ,{
    successRedirect: "/employee",
    failureRedirect: "/loginEmployee"
}),function(req,res){
});

route.get("/logoutEmployee", employeeController.employee_logout);

//Applying for a job
route.post("/job/:id", employeeController.employee_applying_job);
//Apllied jobs route
route.get("/employee/:id/appliedJobs", employeeController.employee_all_applied_jobs);


//Middleware for Employee
function isEmployeeLogin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/loginEmployee");
}
module.exports = route;
