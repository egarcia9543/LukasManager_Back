const mongoose = require('../database/config');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'You must provide a valid fullname']
    },
    email: {
        type: String,
        required: [true, 'You must provide a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password value']
    },
    salary: {
        type: Number,
        required: [true, 'Please provide valid salary information']
    },
    mandatoryExpenses: {
        type: Number,
        required: [true, 'Please provide the amount for mandatory expenses']
    },
    otherExpenses: {
        type: Number,
        required: [true, 'Please provide the amount of other expenses']
    },
    savings: {
        type: Number,
        required: [true, 'Please provide the amount of money you would like to save']
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reports'
    }]
});

const user = mongoose.model('users', userSchema);
module.exports = user;
