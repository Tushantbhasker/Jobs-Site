var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

exports.adding_job = function(req,res){
    Employer.findById(req.params.id, function(err, employer){
        if(err){
            console.log(err);
        }
        else{
            res.render("jobs/new",{employer:employer});
        }
    });
};
exports.adding_job_post = function(req,res){
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
};