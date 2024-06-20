const reportCollection = require('../models/reports.model');
const userCollection = require('../models/users.model');

exports.saveReport = async (reportDate) => {
    try {
        return await new reportCollection(reportDate).save();
    } catch (error) {
        return error;
    }
};

