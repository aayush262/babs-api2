const MarksheetModel = require('./../model/marksheet');

module.exports = {
    getSheetbyClassAndRoll: async(req, res, next)=>{
        try{
            const level = req.params.class;
            const roll = req.params.roll;
            const data = await MarksheetModel.findOne({
                class: `${level}`,
                Roll: `${roll}`
            })
            if(!data){
                res.json({
                    msg: 'You do not have data added on marksheet for this student'
                })
            }
            res.json({
                data
            })
        }catch(e){
            next(e)
        }
    },
    getMarkSheetByClass: async(req,res,next)=>{
        try{
            const level = req.params.class;
            const data = await MarksheetModel.find({
                class: `${level}`,
            }).sort({
                percentage: -1
            })
            res.json({
                data
            })
        }catch(e){
            next(e)
        }
    },
    deleteMarkSheetBYId:async(req,res,next)=>{
        try{
            const id = req.params.id;
            const marksheet = MarksheetModel.findOne({
                _id: id
            })
            const removed = await marksheet.remove()
            res.json({
                data: removed
            })
            
        }catch(e){
            next(e)
        }
    },
    editMarkSheetById:async(req,res,next)=>{
        try{
            const id = req.params.id;
            const marksheet = await MarksheetModel.findOne({
                _id: id
            })
            const data = req.body;
            const fullMarks = data.fullMarks;
            const subjectsArray = Object.keys(fullMarks);
            const fullMarksArray = Object.values(fullMarks);
            let obtainedMarks = [];
            subjectsArray.map((subject, index) => {
                if (fullMarksArray[index] === 'Grade' && data.marksInfo[subject] === 0) {
                    obtainedMarks.push('A+')
                }
                else {
                    obtainedMarks.push(data.marksInfo[subject])
                }
            })
            let totalObtainedMarks = 0;
            obtainedMarks.map((mark, index) => {
                if (fullMarksArray[index] !== 'Grade') {
                    totalObtainedMarks = totalObtainedMarks + Number(mark);
                }

            })
            let totalMarks = 0;
            subjectsArray.map((subject) => {
                if (fullMarks[subject] === '100') {
                    totalMarks = totalMarks + 1;
                } else if(fullMarks[subject] === '50') {
                    totalMarks = totalMarks + 0.5
                }
            })
            totalMarks = totalMarks * 100;
            const percentage = ((totalObtainedMarks / totalMarks) * 100).toFixed(2);
            marksheet.Name = data.Name;
            marksheet.class = data.class;
            marksheet.Roll= data.Roll;
            marksheet.marksInfo = data.marksInfo
            marksheet.percentage = percentage
           
            const saved = await marksheet.save()
            res.json({
                data: saved
            })
            
        }catch(e){
            next(e)
        }
    },
    postMarksheet:async(req,res,next)=>{
        try{
            const data = req.body;
            const fullMarks = data.fullMarks;
            const subjectsArray = Object.keys(fullMarks);
            const fullMarksArray = Object.values(fullMarks);
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
            let totalMarks = 0;
            subjectsArray.map((subject) => {
                if (fullMarks[subject] === '100') {
                    totalMarks = totalMarks + 1;
                } else if(fullMarks[subject] === '50') {
                    totalMarks = totalMarks + 0.5
                }
            })
            totalMarks = totalMarks * 100;
            const percentage = ((totalObtainedMarks / totalMarks) * 100).toFixed(2);

            const savedObj = {}
            subjectsArray.map((subject, index) => {
                savedObj[subject] = obtainedMarks[index]
            })

            const newMarksheet = new MarksheetModel({});

            newMarksheet.Name = data.Name;
            newMarksheet.Roll = data.Roll;
            newMarksheet.class = data.class;
            newMarksheet.marksInfo = savedObj;
            newMarksheet.percentage = percentage;
            newMarksheet.totalMarks = totalMarks;
            newMarksheet.totalObtainedMarks = totalObtainedMarks;
            
            const saved = await newMarksheet.save();
            res.json({
                data: saved
            })

        }catch(e){
            next(e)
        }
    }
}