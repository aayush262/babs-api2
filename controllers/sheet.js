const { GoogleSpreadsheet } = require('google-spreadsheet');
const grade = require('../util/grade');
const gradetoGPA = require('../util/gradetoGPA');
const mpg = require('../util/mpg');
const mpgString = require('../util/mpgString');

module.exports = {
    postSheet: async (req, res, next) => {
        try {
          ;
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
            console.log(totalObtainedMarks)
            console.log(totalMarks)
            console.log(percentage)
            const avgGrade = `${grade(percentage)}`;


  
            const obj = {}
            subjectsArray.map((subject, index) => {
                if(fullMarksArray[index]!=='Grade'){
                    obj[subject] = mpgString(mpg(obtainedMarks[index], fullMarksArray[index]))
                }else{
                    obj[subject] = mpgString({
                        obtainedMarks: `   `,
                        gradePoint: gradetoGPA(obtainedMarks[index]),
                        grade: obtainedMarks[index]
                    })
                }
            })
           
            obj.Roll = data.Roll;
            obj.Name = data.Name;
            obj.Grade = avgGrade;
            obj.Total = totalObtainedMarks;
            obj["%"] = percentage;
            obj.Rank = data.Rank;


            

           
            sheet.addRow(obj);
            res.json({
                msg: 'Successfully Added to the marksheet'
            })
        } catch (e) {
            next(e);
        }

    }
}