const {
  getStudentsByClass,
  getStudentsByClassAndRoll,
  postStudents,
  deleteStudent,
  editStudent,
  getStudentById,
} = require("./../controllers/students");

const Router = require("express").Router();

Router.route("/").post(postStudents);
Router.route("/:level").get(getStudentsByClass);
Router.route("/edit/:id")
  .delete(deleteStudent)
  .put(editStudent)
  .get(getStudentById);
Router.route("/:level/:roll").get(getStudentsByClassAndRoll);

module.exports = Router;
