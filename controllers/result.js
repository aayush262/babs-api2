const mpg = require('./../util/mpg');

const ResultModel= require('./../model/result');
const grade = require('../util/grade');


module.exports={
    postResult: (req,res,next)=>{
        const data= req.body;
        const fullMarks = data.fullMarks;
        const subjectsArray = Object.keys(fullMarks);
        const fullMarksArray = Object.values(fullMarks);
        let totalMarks = 0;
        subjectsArray.map((subject)=>{
            if(fullMarks[subject]===100){
                totalMarks=totalMarks+1;
            }else{
                totalMarks=totalMarks+0.5
            }
        })
        totalMarks=totalMarks*100;
        let obtainedMarks=[];
        subjectsArray.map((subject)=>{
            obtainedMarks.push(data.subjects[subject])
        })
        let totalObtainedMarks=0;
        obtainedMarks.map(mark=>{
            totalObtainedMarks=totalObtainedMarks+Number(mark);
        })
        const percentage =(( totalObtainedMarks/totalMarks)*100).toFixed(2);
        const marksInfo=[];
        subjectsArray.map((subject,index)=>{
            marksInfo.push({
                [subject]:{
                    marks: obtainedMarks[index],
                    gpa: mpg(obtainedMarks[index],Number(fullMarksArray[index])).gradePoint,
                    grade: mpg(obtainedMarks[index],Number(fullMarksArray[index])).grade
                }
            })
        })
        let TotalGPA= 0;
        marksInfo.map((markInfo,index)=>{
            TotalGPA= TotalGPA+Number(markInfo[subjectsArray[index]].gpa)
        })
        const AvgGPA = (TotalGPA/subjectsArray.length).toFixed(1);
        const AvgGrade = grade(percentage);
        const newResult = new ResultModel({}); 
        newResult.data={
            term: data.term,
            class: data.class,
            annualYear: data.annualYear,
            Name: data.Name,
            Roll: data.Roll,
            AvgGPA,
            percentage,
            rank:data.rank,
            AvgGrade,
            Total: totalObtainedMarks,
            marksInfo,
            totalMarks,
            fullMarksArray,
            subjectsArray
        }

        newResult.save((err,saved)=>{
          if(err){
              return next(err)
          }
          return res.status(201).json({
              data:saved,
              msg:'Result Card Created'
          })
        })
       

    },
    getResult: (req,res,next)=>{
        ResultModel.find({})
            .sort({
                _id: -1
            }).exec().then(results=>{
                res.status(201).json({
                    data: results
                })
            }).catch(e=>next(e))
    },
    getResultbyID: (req,res,next)=>{
        ResultModel.findOne({
            _id: req.params.id
        }).exec().then(result=>{
            res.status(201).json({
                data: result
            })
        }).catch(e=>next(e))
    }
}