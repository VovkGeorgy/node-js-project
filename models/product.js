const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectID(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp;
    }

    static fetchAll() {
        return getDb().collection('products').find().toArray()
            .then(products => {
                return products;
            });
    }

    static findById(prodId) {
        return getDb().collection('products').find({_id: new mongodb.ObjectID(prodId)}).next();
    }

    static deleteById(prodId) {
        return getDb().collection('products').deleteOne({_id: new mongodb.ObjectID(prodId)});
    }
}

module.exports = Product;
