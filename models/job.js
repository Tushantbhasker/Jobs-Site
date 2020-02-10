var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
    title:String,
    desc:String,
    appliedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        }
    ]

});
module.exports = mongoose.model("Job",jobSchema);