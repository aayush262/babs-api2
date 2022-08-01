const {
  getSheetbyClassAndRoll,
  getMarkSheetByClass,
  deleteMarkSheetBYId,
  editMarkSheetById,
  postMarksheet,
  addAttendanceByClassAndRoll,
} = require("../controllers/marksheet");

const Router = require("express").Router();

Router.route("/").post(postMarksheet);

Router.route("/delete/:id").delete(deleteMarkSheetBYId);

Router.route("/:class").get(getMarkSheetByClass);

Router.route("/:class/:roll").get(getSheetbyClassAndRoll);

Router.route("/edit/:id").put(editMarkSheetById);

Router.route("/attendance").post(addAttendanceByClassAndRoll);

module.exports = Router;
