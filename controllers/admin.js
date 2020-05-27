const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    })
}

exports.postAddProduct = (req, res, next) => {
    const formData = req.body;
    const prod = new Product(
        formData.title,
        formData.imageUrl,
        formData.description,
        formData.price
    );
    prod.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Adminll products',
            path: '/admin/products',
        });
    });
}