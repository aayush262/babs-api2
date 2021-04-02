const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TransactionSchema = new Schema({
    Name: {
        type: String
    },
    BillNo: {   
        type: String
    },
    ExamType: String,
    Class: String,
    Roll: String,
    Admission: Number,
    School: Number,
    Game: Number,
    Computer: Number,
    Stationery: Number,
    Maintenance: Number,
    FirstAid: Number,
    Entertainment: Number,
    Examination: Number,
    Library: Number,
    Utility: Number,
    Transportation: Number,
    Dues: Number,
    Miscellaneous: Number,
    Paid: Number,
    DueAmount: Number,
    Total: Number
},{
    timestamps: true
})

const TransactionModel = Mongoose.model('transaction', TransactionSchema);

module.exports = TransactionModel;