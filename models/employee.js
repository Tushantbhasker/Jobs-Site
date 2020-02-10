var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var employeeSchema = new mongoose.Schema({
    username:String,
    password:String,
    appliedJobs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ]
});

employeeSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Employee",employeeSchema);