const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const StudentSchema = new Schema({
  Name: String,
  Class: String,
  Roll: String,
});

const StudentModel = Mongoose.model("student", StudentSchema);

module.exports = StudentModel;
