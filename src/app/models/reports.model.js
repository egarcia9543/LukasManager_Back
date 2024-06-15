const { mongo } = require('mongoose');
const mongoose = require('../database/config');

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide an amount']
    }
}, { _id: false });

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Provide a valid user id']
    },
    month: {
        type: String,
        required: [true, 'Report should have a month']
    },
    mandatoryExpenses: {
        type: [expenseSchema],
        required: [true, 'Please provide the mandatory expenses']
    },
    discretionaryExpenses: {
        type: [expenseSchema],
        required: [true, 'Please provide the discretionary expenses']
    },
});

const report = mongoose.model('reports', reportSchema);
module.exports = report;
