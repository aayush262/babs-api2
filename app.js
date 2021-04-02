const Express = require('express');
const App = Express();
const AuthRoutes = require('./routes/auth');
const Dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const TransactionRoutes = require('./routes/transaction');
const SheetRoutes = require('./routes/sheet');
const ResultRoutes = require('./routes/result');
const SubjectRoutes = require('./routes/subject');

Dotenv.config({
    path: './.env'
})

require('./db');

App.use(bodyParser.urlencoded({
    extended: true
}));
App.use(bodyParser.json());

const Port = process.env.PORT;

App.use(cors());

App.use('/',AuthRoutes);
App.use('/bill',TransactionRoutes);
App.use('/sheet',SheetRoutes);
App.use('/result',ResultRoutes);
App.use('/subject',SubjectRoutes);

App.use((err,req,res,next)=>{
    res.status(404).json({
        msg: err
    })
})

App.listen(Port, (err,done)=>{
    if(err){
        console.log('failure starting server');
    }else{
        console.log('Server started listening at port '+Port);
    }
})