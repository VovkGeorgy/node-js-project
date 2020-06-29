const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const formData = req.body;
    Product.create({
        title: formData.title,
        imageUrl: formData.imageUrl,
        description: formData.description,
        price: formData.price
    }).then(result => {
        res.redirect('/')
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
}

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
        });
    });
}

exports.postEditProduct = (req, res, next) => {
    const newProductData = req.body;
    const updatedProduct = new Product(
        newProductData.productId,
        newProductData.title,
        newProductData.imageUrl,
        newProductData.description,
        newProductData.price
    );
    Product.findByPk(newProductData.productId)
        .then(prod => {
            prod.title = newProductData.title;
            prod.imageUrl = newProductData.imageUrl;
            prod.description = newProductData.description;
            prod.price = newProductData.price;
            return prod.save();
        })
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(prod => {
            return prod.destroy();
        })
        .then(result => res.redirect('/admin/products'));
}
