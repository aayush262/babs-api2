const Router =require('express').Router();
const { postTransaction, getTransaction, getTransactionbyId, getFirstTransaction } = require('./../controllers/transaction');

Router.route('/')
    .get(getTransaction)
    .post(postTransaction)

Router.route('/first')
    .get(getFirstTransaction);

Router.route('/:id')
    .get(getTransactionbyId);

module.exports = Router;