const SettingsModel = require("./../model/settings");
const MarksheetModel = require("./../model/marksheet");
const StudentModel = require("./../model/student");

module.exports = {
  getSettings: (req, res, next) => {
    SettingsModel.findById("62cd4190fafa001f0084b44d").then((settings) => {
      res.status(201).json({
        settings,
      });
    });
  },
  postSettings: (req, res, next) => {
    const data = req.body;
    const newSettings = new SettingsModel({});
    if (data.year) newSettings.year = data.year;
    if (data.term) newSettings.term = data.term;

    newSettings.save().then((saved) => {
      res.status(201).json({
        saved,
      });
    });
  },
  editSettings: (req, res, next) => {
    const data = req.body;
    SettingsModel.updateOne(
      { _id: "62cd4190fafa001f0084b44d" },
      {
        $set: {
          year: data.year,
          term: data.term,
        },
        $currentDate: {
          lastUpdated: true,
        },
      }
    ).then((updated) => {
      res.status(201).json({
        updated,
      });
    });
  },
  customEntry: async (req, res, next) => {
    //   const marksheet = await MarksheetModel.find(
    //     {
    //       class: "9",
    //     },
    //     {
    //       _id: 0,
    //       Roll: 1,
    //       Name: 1,
    //     }
    //   );
    //   const newStudents = marksheet.map((student) => {
    //     return {
    //       Roll: student.Roll,
    //       Name: student.Name,
    //       Class: "10",
    //     };
    //   });
    //   StudentModel.create(newStudents).then((ins) => res.send(ins));
  },
};
