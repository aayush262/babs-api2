const { GoogleSpreadsheet } = require('google-spreadsheet');
const grade = require('../util/grade');
const mpg = require('../util/mpg');
const mpgString = require('../util/mpgString');

module.exports = {
    postSheet: async (req, res, next) => {
        try {
            const doc = new GoogleSpreadsheet('1EcGk9UmvAT3Jmy3OnbrHyFEGg8ItVxlog9Vnn1Zu4WE');
            await doc.useServiceAccountAuth({
                client_email: "sheeets@big-cargo-274413.iam.gserviceaccount.com",
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyTexYuvx17hx6\nM0bgl9JKCh7hPjIH7r8SqWmasrOMZ+jFSdvmofniekyiGdnjMtw1ugM2fr7JfEQ5\nNzW3BO96eXCkiMgGh2kyqeSYEhVT2Yl0WogqdRSgQph+f1FB3gXX4p20Itg7SNRi\nm8Esz5qeDEQY2t1SLbKf0NyvAT+4jBCljpnPfpsAA7IcQnKG60ugJPtc1jPrKV3m\nYYz9I6sYZyXcaL3vFGt8yjP20TqU0QaIjWWEHMf527pJakYA9npQxDLkAvELuV9r\nTB7zjBLqCXZYxDU13A7ugRxzRryYIzQjWkYRHAMtIqWBcn8Z/EEqowZUY5XJe0ya\nlbmZaArLAgMBAAECggEAPpd4JlXNliB2QreJZAInwfH3kR5iNcKrtINgHPwqZ1l6\nrvcUiMvHiqdgC2+Du2v5PasEwbaQhu5mjKdC5fKHlrjWwAt8HD6gwTY+ltuSPRMa\nW4wETNM44GFAYveSsMqdxoE41yl8OqOAWvVORMrD/kNUDF2YX+bG069gKNcJZWC/\nsZJNXVZSeTw3o0bhvm+XrVC5FOnxajD8I5tfApgCheWNsp8xMo4bWQcaXZ8kITXz\npieK0fuwiET83zg45RwULY9eZcF8AMY0D+rHdiDQlQggc3tJYoDlAUZW7dQlYiBC\ncamDis59ykKNIpuQa2GzGV2P6hZgbUdr0s+bon460QKBgQDgURdxAt3Ul8KjGeH1\nryLZUfI6CHSc2hwuprBxMg2C9P9jOkP6KaQ8WaHpjPEN/2KGeaJARmvbZ6VEaejo\nWT2IOvcDgUg8iVsYbaBu/hBu8ZTlyn8kI52mNNL+lRt6hYSLqqFaT0GxcHpJl4Pl\nvyWZVwtzPhU6xhxnesJ7YmTi9QKBgQDLfRpvMjQgvtdFRdODQoxEfpOJvZHKeWxd\npN5pux5KKtZwcYdVnIqJA04s8JdQV/wIafNkKUy/kmVn6rWvrCmhhp4SVI3dJOUL\nb1zHHcioSisEduenDOv1pHp13MypHFOyWouB14GxZzHEvpf4jS2Zy0Lm7QUKp2oZ\na89utSIevwKBgCTQqkw98DJoBeXG5bLw34NTU7H6mUj08xMlAGhTkqwfkZqzgVyZ\nYP8WpuAx5Y4qj/0KEXsDE8iapiEoULVxkAu/wbKtkTF+SZkkxOPyhrfupkVgiqVf\nwwv4N3jY9/2P1EUn5/tubpW0pB1X5KncSUt1Yce0NL/Eq/y/xROC/pPRAoGBAJWj\nwAa5gn/6F1BH0w0ZqRDNjC2kjEu7EyeiEDTsd4/PBLbXpdAdN/sdxSVjH8LjkOGX\nGHc1r8zJGW1bupQfJNY1qpSMPW68rPrFwBJlIqQvNocn8Z508ChJ9gwqfQ53WE02\nLJUlJ6iP3Jd0GUmceEY6pU4wSp7VEj7zey1MYnT9AoGAaYyYj9n16+GFRRrwKH8h\ndbYCtL28PW7oLbdDDN62FtfUYRA21vNPHTiNq/LaIvPp6T4kFrVRGf9PInQy5Kxf\nOET/aZ16y8tHklDFFUdQt13xp5jSw6jkpW5qfA1VJ10TRqvXnyi8vrp9Ee3btl4O\nlBgI89mXttvemQ8sfeCIb2M=\n-----END PRIVATE KEY-----\n"
            });

            await doc.loadInfo();
            const data = req.body;
            let sheetIndex=0;
            if(data.class==='Nursery'){
                
            }
            else if(data.class==='KG'){
                sheetIndex =1;
            }else{
                sheetIndex = 1 + Number(data.class)
            }
            
            
            const sheet = doc.sheetsByIndex[sheetIndex]
            const fullMarks = data.fullMarks;
            const subjectsArray = Object.keys(fullMarks);
            const fullMarksArray = Object.values(fullMarks);
            let obtainedMarks = [];
            subjectsArray.map((subject) => {
                obtainedMarks.push(data.subjects[subject])
            })
            let totalObtainedMarks = 0;
            obtainedMarks.map(mark => {
                totalObtainedMarks = totalObtainedMarks + Number(mark);
            })
            console.log(totalObtainedMarks);
            console.log(obtainedMarks);
            let totalMarks = 0;
            subjectsArray.map((subject) => {
                if (fullMarks[subject] === 100) {
                    totalMarks = totalMarks + 1;
                } else {
                    totalMarks = totalMarks + 0.5
                }
            })
            totalMarks = totalMarks * 100;
            const percentage =(( totalObtainedMarks/totalMarks)*100).toFixed(2);
            // const Total = Number(result.Nepali) + Number(result.Wonder) + Number(result.Social) + Number(result.Math) + Number(result.Science) + Number(result.Grammar)
            // const percentage = ((Total / 600) * 100).toFixed(1);
            const avgGrade = `       ${grade(percentage)}`;

            
            // result.Wonder = mpgString(mpg(result.Wonder, 100));
            // result.Nepali = mpgString(mpg(result.Nepali, 100));
            // result.Social = mpgString(mpg(result.Social, 100));
            // result.Math = mpgString(mpg(result.Math, 100));
            // result.Science = mpgString(mpg(result.Science, 100));
            // result.Grammar = mpgString(mpg(result.Grammar, 100))
            const obj = {}
            subjectsArray.map((subject,index)=>{
                obj[subject] = mpgString(mpg(obtainedMarks[index],fullMarksArray[index]))
            })
            obj.Roll = data.Roll;
            obj.Name = data.Name;
            obj.Grade = avgGrade;
            obj.Total = totalObtainedMarks;
            obj["%"] = percentage;
            // sheet.addRow(
            //     {
            //         Roll: data.Roll,
            //         Name: data.Name,
            //         Wonder: result.Wonder,
            //         Nepali: result.Nepali,
            //         Social: result.Social,
            //         Math: result.Math,
            //         Science: result.Science,
            //         Grammar: result.Grammar,
            //         Total: Total,
            //         '%': percentage,
            //         Grade: avgGrade
            //     }
            // );
            sheet.addRow(obj);
            res.json({
                msg: 'Successfully Added to the marksheet'
            })
        } catch (e) {
            next(e);
        }

    }
}