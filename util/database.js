const mongodb = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://node-user:jb02EDbFN5keVfTR@mongotestcluster.wadi6.mongodb.net/shop?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
    mongoose.connect(uri)
        .then(() => {
            console.log('CONNECTED TO MONGODB BY MONGOOSE!');
            callback();
        })
        .catch(err => console.log(err));
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No DB found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
