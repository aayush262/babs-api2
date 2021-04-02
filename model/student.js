const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {    
        type: String,
        required: true
    },
    middleName:{
        type: String
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    phoneNumber:{
        type: String
    },
    gender:{
        type: String,
        enum:['male','female','others']
    },
    address:{
        permanent_address: String,
        temp_address: [String]
    },
    dob: Date
})

const StudentModel = Mongoose.model('student',StudentSchema);

module.exports= StudentModel;   