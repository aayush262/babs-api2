const Router = require('express').Router()
const { postResult, getResult, getResultbyID } = require('./../controllers/result');
 
Router.route('/')
    .post(postResult)
    .get(getResult);

Router.route('/:id')
    .get(getResultbyID);
    
module.exports = Router;