var express = require("express");
var route = express.Router();
var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");



route.get("/employee", isEmployeeLogin, function(req,res){
    Job.find({}, function(err,jobs){
        if(err){
            console.log(err);
        }
        else{
            res.render("employee/page",{jobs: jobs, employee:req.user});
        }
    }); 
   
});

// Auth routes for employee
route.get("/registeEmployee",function(req,res){
    res.render("employee/register")
});
route.post("/registeEmployee", function(req,res){
    Employee.register(new Employee({username: req.body.username}) , req.body.password, function(err, employee){
        if(err){
            console.log(err);
            res.render("employee/register");
        }
        else {
            passport.authenticate("Employee")(req,res, function(){
                res.redirect("/employee");
            });
        }
    });
});
// Login routes for Employee======
route.get("/loginEmployee", function(req,res){
    res.render("employee/login");
});
route.post("/loginEmployee", passport.authenticate("Employee" ,{
    successRedirect: "/employee",
    failureRedirect: "/loginEmployee"
}),function(req,res){
});
route.get("/logoutEmployee", function(req,res){
    req.logout();
    res.redirect("/");
});

//Applying for a job
route.post("/job/:id", function(req,res){
    // console.log(req.user);
    // var em = req.body;
    Job.findById(req.params.id, function(err, job){
        if(err){
            console.log(err);
        }
        else{
            Employee.findById(req.user.id, function(err,employee){
                if(err){
                    console.log(err);
                } else {
                    if(employee.appliedJobs.indexOf(job._id) === -1){
                        job.appliedBy.push(req.user.id);
                        job.save();
                        employee.appliedJobs.push(job);
                        employee.save();
                    }
                    else{
                    }
                    
                }
            });
            res.redirect("/employee");
        }
    });

});
//Apllied jobs route
route.get("/employee/:id/appliedJobs",function(req,res){
    Employee.findById(req.user.id).populate("appliedJobs").exec(function(err,employee){
        if(err){
            console.log(err);
        } else {
            // console.log(employee);
            res.render("employee/appliedJobs",{jobs: employee.appliedJobs});
        }
    });

    
});


//Middleware for Employee
function isEmployeeLogin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/loginEmployee");
}
module.exports = route;
