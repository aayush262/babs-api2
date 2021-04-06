const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const markSheetSchema = new Schema({
    Name: String,
    class: String,
    Roll: String,
    marksInfo : Object
})

const markSheetModel = mongoose.model('marksheet',markSheetSchema);

module.exports = markSheetModel;