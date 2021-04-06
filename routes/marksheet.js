const { getSheetbyClassAndRoll } = require('../controllers/marksheet');

const Router = require('express').Router()

Router.route('/:class/:roll')
    .get(getSheetbyClassAndRoll);

module.exports= Router;