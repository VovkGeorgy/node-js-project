const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');
const pathToProductsFile = path.join(rootPath, 'data', 'products.json');


const getProductsFromFile = cb => {
    fs.readFile(pathToProductsFile, (err, data) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(data.toString()));
    });
};

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(pathToProductsFile, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}