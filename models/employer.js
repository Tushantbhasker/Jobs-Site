var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var employerSchema = new mongoose.Schema({
    username:String,
    password:String,
    jobs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ]
});
employerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Employer",employerSchema);