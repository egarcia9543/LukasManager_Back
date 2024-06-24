const expenseCollection = require('../models/expenses.model');

exports.createExpenseRecord = async (expenseInfo) => {
    try {
        return new expenseCollection(expenseInfo).save();
    } catch (error) {
        return error;
    }
};

exports.getExpenseByUserAndDate = async (filter, projection) => {
    try {
        return await expenseCollection.find(filter, projection);
    } catch (error) {
        return error;
    }
};

exports.getExpensesByUserInAMonth = async (filter, projection) => {
    try {
        return await expenseCollection.find(filter, projection);
    } catch (error) {
        return error;
    }
};

exports.deleteExpenseRecord = async (filter) => {
    try {
        return await expenseCollection.findByIdAndDelete(filter);
    } catch (error) {
        return error;
    }
}