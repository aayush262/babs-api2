const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const resultSchema = new Schema({
    data:{
        type: Object,
        required: true
    }
   
})

const ResultModel = Mongoose.model('result',resultSchema);

module.exports= ResultModel