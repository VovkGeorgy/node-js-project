const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://node-user:jb02EDbFN5keVfTR@mongotestcluster.wadi6.mongodb.net/shop?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(uri)
        .then(client => {
            console.log('CONNECTED TO MONGODB!');
            _db = client.db();
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
