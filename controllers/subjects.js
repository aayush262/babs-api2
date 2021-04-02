const SubjectModel = require('./../model/subject');

module.exports = {
    postSubject: async (req, res, next) => {
        try {
            const data = req.body;
            const newSubject = new SubjectModel({});
            newSubject.Name = data.name;
            newSubject.Class = data.class;
            newSubject.FullMarks = Number(data.fullMarks)
            const saved = await newSubject.save();
            res.status(201).json({
                data: saved
            })
        } catch (e) {
            next(e)
        }
    },
    getSubjects: async (req, res, next) => {
        try {
            const subject = await SubjectModel.find({});
            res.status(201).json({
                data: subject
            })
        } catch (e) {
            next(e);
        }
    },
    getSubjectsByClass: async (req, res, next) => {
        try {
            const level = req.params.class;
            const subjects = await SubjectModel.find({ Class: level });
            res.status(201).json({
                data: subjects
            })
        } catch (e) {
            next(e)
        }
    },
    deleteSubject: async (req, res, next) => {
        try {
            const subject = await SubjectModel.findOne({ _id: req.params.class });
            await subject.remove();
            res.status(201).json({
                msg: 'Succesfully removed'
            })
        } catch (e) {
            next(e)
        }
    },
    getSubjectById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const subject = await SubjectModel.findOne({ _id: id });
            res.json({
                data: subject
            })
        } catch (e) {
            next(e)
        }
    },
    editSubjectbyId: async (req, res, next) => {
        try {
            const id = req.params.id;
            const newName = req.body.name;
            const newfullMarks = req.body.fullMarks;
            const subject = await SubjectModel.findOne({ _id: id });
            if (newName)
                subject.Name = newName;
            if (newfullMarks)
                subject.FullMarks = newfullMarks;
            const saved =  await subject.save()
            res.json({
                data: saved,
                msg: 'Succesfully Updated'
            })
        } catch (e) {
            next(e)
        }
    },
}