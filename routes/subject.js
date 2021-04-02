const { postSubject, getSubjects, getSubjectsByClass, deleteSubject, getSubjectById, editSubjectbyId } = require('../controllers/subjects')

const Router = require('express').Router()

Router.route('/')
    .post(postSubject)
    .get(getSubjects)

Router.route('/:class')
    .get(getSubjectsByClass)
    .delete(deleteSubject);
   
Router.route('/id/:id')
    .get(getSubjectById)
    .post(editSubjectbyId);

module.exports= Router
