const TransactionModel = require('./../model/transaction');

module.exports = {
    postTransaction: (req, res, next) => {
        const data = req.body;

        const newTransaction = new TransactionModel({});
        newTransaction.Name = data.Name;
        newTransaction.Class = data.Class;
        newTransaction.Roll = data.Roll;
        newTransaction.ExamType = data.ExamType;
        newTransaction.Admission = data.Admission;
        newTransaction.School = data.School;
        newTransaction.Game = data.Game;
        newTransaction.Computer = data.Computer;
        newTransaction.Stationery = data.Stationery;
        newTransaction.Maintenance = data.Maintenance;
        newTransaction.FirstAid = data.FirstAid;
        newTransaction.Entertainment = data.Entertainment;
        newTransaction.Examination = data.Examination;
        newTransaction.Library = data.Library;
        newTransaction.Utility = data.Utility;
        newTransaction.Transportation = data.Transportation;
        newTransaction.Dues = data.Dues;
        newTransaction.Miscellaneous = data.Miscellaneous;
        newTransaction.Total = data.total;
        newTransaction.DueAmount = data.dueAmount;
        newTransaction.BillNo = data.BillNo;
        newTransaction.Paid = data.Paid;
        newTransaction.save((err, saved) => {
            if (err) {
                res.status(404).json({
                    err: '404 Error'
                })
            }
            else {
                res.status(201).json({
                    data: saved
                })
            }
        })
    },
    getTransaction: (req, res, next) => {
        TransactionModel.find({}).sort({
            _id: -1
        }).exec().then(transactions => {
            res.status(201).json(
                {
                    data: transactions
                }
            )
        }).catch(err => {
            res.status(404).json({
                err: '404 Error'
            })
        })
    },
    getTransactionbyId: (req, res, next) => {
        TransactionModel.findById(req.params.id)
            .exec((err, transaction) => {
                if (err) {
                    res.status(404).json({
                        err: '404 Error'
                    })
                }
                res.status(201).json({
                    data: transaction
                })
            })
    },
    getFirstTransaction: (req, res, next) => {
        TransactionModel.find({})
            .sort({
                _id: -1
            })
            .limit(1)
            .exec()
            .then(transaction => {
                res.status(201).json({
                    data: transaction[0]
                })
            })
            .catch(err => {
                res.status(404).json({
                    data: "404 Error"
                })
            })
    }
}