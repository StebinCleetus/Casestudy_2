const Mongoose = require("mongoose");
const employeeSchema = Mongoose.Schema({
    name: String,
    location: String,
    position: String,
    salary: Number
});
const employeeDB = Mongoose.model("employees", employeeSchema);
module.exports = employeeDB;