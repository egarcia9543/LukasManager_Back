const userCollection = require('../models/users.model');

exports.createUserRecord = async (userInfo) => {
    try {
        return new userCollection(userInfo).save();
    } catch (error) {
        return error;
    }
};

exports.getUserData = async (filter, projection) => {
    try {
        if (!filter) return await userCollection.findOne(filter);
        else return await userCollection.findOne(filter, projection);
    } catch (error) {
        return error;
    }
};

exports.updateUserData = async (filter, updatedData) => {
    try {
        if (!filter || !updatedData) return {error: 'Is not possible to perform this action'};
        return await userCollection.findOneAndUpdate(filter, updatedData, {new: true});
    } catch (error) {
        return error;
    }
};
