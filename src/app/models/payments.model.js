const mongoose = require('../database/config');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the payment']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide the amount of the payment']
    },
    category: {
        type: String,
        required: [true, 'Please provide the category of the payment']
    },
    paymentDay: {
        type: Number,
        required: [true, 'Please provide the payment day']
    },
    isPaid: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('payments', paymentSchema);