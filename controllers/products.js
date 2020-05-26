const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    })
}

exports.postAddProduct = (req, res, next) => {
    const prod = new Product(req.body.title);
    prod.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: Product.fetchAll(),
        path: '/',
        pageTitle: 'Shop',
    });
}