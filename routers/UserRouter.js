const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/UserContoller');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/check-email', userController.isEmailReapeated);
router.post('/logout', userController.logout);
router.patch('/', userController.modifyPassword);

module.exports = userRouter;