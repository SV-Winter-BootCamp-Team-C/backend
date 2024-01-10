const express = require('express');
const router = express.Router();
const surveyController = require('../controller/surveyCreate');
const surveyModifyController = require('../controller/surveyModify');
const surveyAllUserController = require('../controller/formAllUser');
const surveyGetController = require('../controller/surveyContentRead');
const findAnsweredSurvey = require('../controller/surveyView');
const getSurveyUrlController = require('../controller/getSurveyUrl');

router.post('/', surveyController.createSurveyWithQuestionsAndChoices);
router.put('/:id', surveyModifyController.ModifySurveyWithQuestionsAndChoices);
router.get('/:id/forms', surveyAllUserController.getUserSurveys);
router.get('/:id/join', findAnsweredSurvey.findAnsweredSurvey);
router.get('/:id', surveyGetController.getSurveyById);
router.get('/:id/urls', getSurveyUrlController.getUrl);

module.exports = router;
