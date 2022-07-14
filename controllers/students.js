const StudentModel = require("./../model/student");

module.exports = {
  getStudentsByClass: (req, res, next) => {
    const { level } = req.params;
    StudentModel.find({
      Class: level,
    })
      .sort({
        Roll: 1,
      })
      .collation({ locale: "en_US", numericOrdering: true })
      .then((students) => {
        res.send(students);
      });
  },
  getStudentsByClassAndRoll: (req, res, next) => {
    const { level, roll } = req.params;
    StudentModel.findOne({
      Class: level,
      Roll: roll,
    }).then((students) => {
      res.send(students);
    });
  },
  postStudents: (req, res, next) => {
    const { name, level, roll } = req.body;
    const newStudent = new StudentModel({
      Name: name,
      Class: level,
      Roll: roll,
    });
    newStudent.save().then((saved) => {
      res.status(201).json({
        saved,
        msg: "Student Sucessfull Added",
      });
    });
  },
  deleteStudent: async (req, res, next) => {
    try {
      const id = req.params.id;
      const student = StudentModel.findById(id);
      await student.remove();
      res.json({
        msg: "Successfully Deleted",
      });
    } catch (e) {
      next(e);
    }
  },
  editStudent: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, level, roll } = req.body;
      const student = await StudentModel.findById(id);
      student.Name = name;
      student.Class = level;
      student.Roll = roll;
      await student.save();
      res.json({
        msg: "Saved Changes",
      });
    } catch (e) {
      next(e);
    }
  },
  getStudentById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const student = await StudentModel.findById(id);
      res.send(student);
    } catch (e) {
      next(e);
    }
  },
};
