var LocalStrategy = require("passport-local");
var Employer = require("../models/employer");
var Employee = require("../models/employee");
var Job = require("../models/job");

function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}
module.exports = function(passport){
    passport.serializeUser(function(userObject, done){
        let userGroup = "employer";
        let userPrototype =  Object.getPrototypeOf(userObject);

        if (userPrototype === Employer.prototype) {
        userGroup = "employer";
        } else if (userPrototype === Employee.prototype) {
        userGroup = "employee";
        }

        let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
        done(null,sessionConstructor);

    });
    passport.deserializeUser(function (sessionConstructor, done) {

        if (sessionConstructor.userGroup == 'employer') {
        Employer.findOne({
            _id: sessionConstructor.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
        } else if (sessionConstructor.userGroup == 'employee') {
        Employee.findOne({
            _id: sessionConstructor.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
        } 

    });
    passport.use("Employee", new LocalStrategy(Employee.authenticate()));
    passport.use("Employer",new LocalStrategy(Employer.authenticate()));

}