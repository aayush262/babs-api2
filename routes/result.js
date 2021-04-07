const Router = require('express').Router()
const { postResult, getResult, getResultbyID, getResultByClass, deletResultById } = require('./../controllers/result');

Router.route('/')
    .post(postResult)
    .get(getResult);

Router.route('/:id')
    .get(getResultbyID);

Router.route('/delete/:id')
    .delete(deletResultById);

Router.route('/class/:class')
    .get(getResultByClass);



module.exports = Router;