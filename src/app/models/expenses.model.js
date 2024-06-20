const e = require('express');
const mongoose = require('../database/config');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Provide a valid user id']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide an amount']
    },
    date: {
        type: Date,
        required: [true, 'Report should have a date']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Obligatory', 'Other', 'Savings']
    }
});

const expenses = mongoose.model('expenses', expenseSchema);
module.exports = expenses;
