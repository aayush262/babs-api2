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
    }
}