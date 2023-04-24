const express = require('express');
const router = express.Router();
const userController = require('../app/controller/UserController')

//get
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.get('/register', userController.getRegister)
router.get('/login', userController.getLogin)
//post
router.post('/register' , userController.isRegister);
router.post('/login', userController.isLogin)
router.post('/refresh', userController.requestRefreshToken)
module.exports = router