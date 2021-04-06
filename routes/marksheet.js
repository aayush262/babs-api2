const { getSheetbyClassAndRoll, getMarkSheetByClass, deleteMarkSheetBYId } = require('../controllers/marksheet');

const Router = require('express').Router()

Router.route('/delete/:id')
    .delete(deleteMarkSheetBYId);


Router.route('/:class')
    .get(getMarkSheetByClass);

Router.route('/:class/:roll')
    .get(getSheetbyClassAndRoll);

module.exports= Router;