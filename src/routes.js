const express = require('express');
const router = express.Router();

const userController = require('./app/controller/user.controller');

router.post('/sign-up', userController.registerUser);
router.post('/login', userController.login);

module.exports = router;