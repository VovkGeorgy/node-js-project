const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const getDb = require('../util/database').getDb;

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id ? ObjectID(id) : null;
    }

    save() {
        return getDb().collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({productId: new Object(product._id), quantity: newQuantity})
        }

        const updatedCart = {items: updatedCartItems};
        return getDb().collection('users').updateOne(
            {_id: ObjectID(this._id)},
            {$set: {cart: updatedCart}}
        );
    }

    getCart() {
        const productIds = this.cart.items.map(item => item.productId);
        return getDb().collection('products').find({_id: {$in: productIds}}).toArray()
            .then(products => {
                return products.map(product => {
                    return {
                        ...product,
                        quantity: this.cart.items.find(item => item.productId.toString() === product._id.toString()).quantity
                    }
                })
            });
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        return getDb().collection('users').updateOne(
            {_id: ObjectID(this._id)},
            {$set: {cart: {items: updatedCartItems}}}
        );
    }

    addOrder() {
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: ObjectID(this._id),
                        name: this.name,
                    }
                }
                return getDb().collection('orders').insertOne(order);
            })
            .then(result => {
                this.cart = {items: []};
                return getDb().collection('users').updateOne(
                    {_id: ObjectID(this._id)},
                    {$set: {cart: {items: []}}}
                );
            });
    }

    getOrders() {
        return getDb().collection('orders').find({'user._id': ObjectID(this._id)}).toArray();
    }

    static fetchAll() {
        return getDb().collection('users').find().toArray()
            .then(users => {
                return users;
            });
    }

    static findById(userId) {
        return getDb().collection('users').findOne({_id: ObjectID(userId)});
    }

    static deleteById(userId) {
        return getDb().collection('users').deleteOne({_id: ObjectID(userId)});
    }
}

module.exports = User;
