const paymentCollection = require('../models/payments.model');

exports.createPaymentRecord = async (paymentInfo) => {
    try {
        return new paymentCollection(paymentInfo).save();
    } catch (error) {
        return error;
    }
};

exports.getPaymentsByUser = async (user) => {
    try {
        return paymentCollection.find({ user });
    }
    catch (error) {
        return error;
    }
}

exports.deletePaymentRecord = async (filter) => {
    try {
        return await paymentCollection.findByIdAndDelete(filter);
    }
    catch (error) {
        return error;
    }
}