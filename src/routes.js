const express = require('express');
const router = express.Router();

const userController = require('./app/controller/user.controller');

router.post('/sign-up', userController.registerUser);

module.exports = router;