const Router = require('express').Router();
const AuthController = require('./../controllers/auth');

Router.route('/')
    .get(AuthController.getIndexPage)
    .post(AuthController.postLoginPage);

module.exports = Router;