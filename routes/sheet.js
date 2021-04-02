const Router = require('express').Router();
const { postSheet } = require('./../controllers/sheet');

Router.route('/')
    .post(postSheet);

module.exports =Router;