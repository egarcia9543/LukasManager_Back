const express = require('express');
const router = express.Router();

const userController = require('./app/controller/user.controller');
const reportController = require('./app/controller/report.controller');
const expenseController = require('./app/controller/expense.controller');

router.post('/sign-up', userController.registerUser);
router.post('/login', userController.login);
// router.post('/save-report', reportController.saveReport);
router.post('/save-expense', expenseController.saveExpense);
router.get('/get-expense', expenseController.getExpenseByDate);
module.exports = router;