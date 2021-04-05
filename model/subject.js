const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    FullMarks:{
        type: String,
        enum: [100,50,'Grade'],
        default: 100
    },
    Class:{
        type: String,
        required: true
    }
})

const SubjectModel = mongoose.model('subject',SubjectSchema);

module.exports = SubjectModel;