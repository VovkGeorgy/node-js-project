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
    constructor(title) {
        this.title = title;
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