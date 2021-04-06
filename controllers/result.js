const mpg = require('./../util/mpg');
const gradetoGPA = require('./../util/gradetoGPA');
const ResultModel = require('./../model/result');
const grade = require('../util/grade');


module.exports = {
    postResult: (req, res, next) => {
        const data = req.body;
        console.log(data);
        const fullMarks = data.fullMarks;
        const subjectsArray = Object.keys(fullMarks);
        const fullMarksArray = Object.values(fullMarks);
        let totalMarks = 0;
        subjectsArray.map((subject) => {
            if (fullMarks[subject] === '100') {
                totalMarks = totalMarks + 1;
            } else if (fullMarks[subject] === '50') {
                totalMarks = totalMarks + 0.5
            }
        })
        totalMarks = totalMarks * 100;
        let obtainedMarks = [];
        subjectsArray.map((subject, index) => {
            if (fullMarksArray[index] === 'Grade' && data.subjects[subject] === 0) {
                obtainedMarks.push('A+')
            }
            else {
                obtainedMarks.push(data.subjects[subject])
            }
        })
        let totalObtainedMarks = 0;
        obtainedMarks.map((mark, index) => {
            if (fullMarksArray[index] !== 'Grade') {
                totalObtainedMarks = totalObtainedMarks + Number(mark);
            }

        })
        const percentage = ((totalObtainedMarks / totalMarks) * 100).toFixed(2);
        const marksInfo = [];
        subjectsArray.map((subject, index) => {
            marksInfo.push({
                [subject]: {
                    marks: fullMarksArray[index] === 'Grade' ? null :obtainedMarks[index],
                    gpa: fullMarksArray[index] === 'Grade' ? gradetoGPA(obtainedMarks[index]) : mpg(obtainedMarks[index], Number(fullMarksArray[index])).gradePoint,
                    grade: fullMarksArray[index] === 'Grade' ? obtainedMarks[index] : mpg(obtainedMarks[index], Number(fullMarksArray[index])).grade
                }
            })
        })
        let TotalGPA = 0;
        marksInfo.map((markInfo, index) => {
            TotalGPA = TotalGPA + Number(markInfo[subjectsArray[index]].gpa)
        })
        
        const AvgGPA = (TotalGPA / subjectsArray.length).toFixed(1);
        const AvgGrade = grade(percentage);
        const newResult = new ResultModel({});
        newResult.class= data.class
        newResult.data = {
            term: data.term,
            class: data.class,
            annualYear: data.annualYear,
            Name: data.Name,
            Roll: data.Roll,
            AvgGPA,
            percentage,
            rank: data.rank,
            AvgGrade,
            Total: totalObtainedMarks,
            marksInfo,
            totalMarks,
            fullMarksArray,
            subjectsArray
        }

        newResult.save((err, saved) => {
            if (err) {
                return next(err)
            }
            return res.status(201).json({
                data: saved,
                msg: 'Result Card Created'
            })
        })


    },
    getResult: (req, res, next) => {
        ResultModel.find({})
            .sort({
                _id: -1
            }).exec().then(results => {
                res.status(201).json({
                    data: results
                })
            }).catch(e => next(e))
    },
    getResultbyID: (req, res, next) => {
        ResultModel.findOne({
            _id: req.params.id
        }).exec().then(result => {
            res.status(201).json({
                data: result
            })
        }).catch(e => next(e))
    },
    getResultByClass: async(req,res,next)=>{
       
        try{
            const level = req.params.class
            const data =  await ResultModel.find({
                class: `${level}`
            })
            res.json(data)
        }catch(e){
            next(e)
        }
    }
}