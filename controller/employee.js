var passport = require("passport");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");


exports.employee_routes = function(req,res){
    Job.find({}, function(err,jobs){
        if(err){
            console.log(err);
        }
        else{
            res.render("employee/page",{jobs: jobs, employee:req.user});
        }
    }); 
   
}
exports.employee_register = function(req,res){
    res.render("employee/register")
};
exports.employee_register_post = function(req,res){
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
};

exports.employee_login = function(req,res){
    res.render("employee/login");
};
exports.employee_logout = function(req,res){
    req.logout();
    res.redirect("/");
};


exports.employee_applying_job = function(req,res){
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

};

exports.employee_all_applied_jobs = function(req,res){
    Employee.findById(req.user.id).populate("appliedJobs").exec(function(err,employee){
        if(err){
            console.log(err);
        } else {
            // console.log(employee);
            res.render("employee/appliedJobs",{jobs: employee.appliedJobs});
        }
    });

    
};