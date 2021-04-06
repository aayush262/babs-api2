const Router = require('express').Router()
const { postResult, getResult, getResultbyID, getResultByClass } = require('./../controllers/result');
 
Router.route('/')
    .post(postResult)
    .get(getResult);

Router.route('/:id')
    .get(getResultbyID);

Router.route('/class/:class')
    .get(getResultByClass);
    
module.exports = Router;