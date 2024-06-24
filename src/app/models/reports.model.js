const mongoose = require('../database/config');

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
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expenses'
    }]
});

const report = mongoose.model('reports', reportSchema);
module.exports = report;
