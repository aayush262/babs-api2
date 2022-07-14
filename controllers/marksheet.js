const MarksheetModel = require("./../model/marksheet");

module.exports = {
  getSheetbyClassAndRoll: async (req, res, next) => {
    try {
      const level = req.params.class;
      const roll = req.params.roll;
      const data = await MarksheetModel.findOne({
        class: `${level}`,
        Roll: `${roll}`,
      });
      if (!data) {
        res.json({
          msg: "You do not have data added on marksheet for this student",
        });
      }
      res.json({
        data,
      });
    } catch (e) {
      next(e);
    }
  },
  getMarkSheetByClass: async (req, res, next) => {
    try {
      const level = req.params.class;
      const data = await MarksheetModel.find({
        class: `${level}`,
      })
        .sort({
          Roll: 1,
        })
        .collation({ locale: "en_US", numericOrdering: true });
      res.json({
        data,
      });
    } catch (e) {
      next(e);
    }
  },
  deleteMarkSheetBYId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const marksheet = MarksheetModel.findOne({
        _id: id,
      });
      const removed = await marksheet.remove();
      res.json({
        data: removed,
      });
    } catch (e) {
      next(e);
    }
  },
  editMarkSheetById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const marksheet = await MarksheetModel.findOne({
        _id: id,
      });
      const data = req.body;
      let totalFullMarks = 0;
      let totalObtainedMarks = 0;
      const subjects = Object.keys(data.marksInfo);
      subjects.forEach((subject) => {
        if (data.marksInfo[subject].fullMarks !== "Grade") {
          totalObtainedMarks +=
            +data.marksInfo[subject].exam + +data.marksInfo[subject].test;
          totalFullMarks += +data.marksInfo[subject].fullMarks;
        }
      });
      const percentage = ((totalObtainedMarks / totalFullMarks) * 100).toFixed(
        2
      );
      marksheet.Name = data.Name;
      marksheet.class = data.class;
      marksheet.Roll = data.Roll;
      marksheet.marksInfo = data.marksInfo;
      marksheet.percentage = percentage;
      const saved = await marksheet.save();
      res.status(201).json({
        saved,
        msg: "Saved Changes Successfully",
      });
    } catch (e) {
      next(e);
    }
  },
  postMarksheet: async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      let totalFullMarks = 0;
      let totalObtainedMarks = 0;
      const subjects = Object.keys(data.scores);
      subjects.forEach((subject) => {
        if (data.scores[subject].fullMarks !== "Grade") {
          totalObtainedMarks +=
            +data.scores[subject].exam + +data.scores[subject].test;
          totalFullMarks += +data.scores[subject].fullMarks;
        }
      });
      const percentage = ((totalObtainedMarks / totalFullMarks) * 100).toFixed(
        2
      );
      const newMarkSheet = new MarksheetModel({
        Name: data.name,
        Roll: data.roll,
        class: data.class,
        marksInfo: data.scores,
        percentage: percentage,
      });
      const saved = await newMarkSheet.save();
      res.status(201).json({
        saved,
        msg: "Marksheet Successfully Created",
      });
    } catch (e) {
      next(e);
    }
  },
};
