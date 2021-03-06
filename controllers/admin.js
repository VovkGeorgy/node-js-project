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
    const product = new Product({
        title: formData.title,
        price: formData.price,
        description: formData.description,
        imageUrl: formData.imageUrl,
        userId: req.user._id
    });
    product.save().then(result => {
        res.redirect('/')
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
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

exports.postEditProduct = (req, res, next) => {
    const newProductData = req.body;
    Product.findById(newProductData.productId)
        .then(product => {
            product.title = newProductData.title;
            product.price = newProductData.price;
            product.description = newProductData.description;
            product.imageUrl = newProductData.imageUrl;
            return product.save();
        })
        .then(() => res.redirect('/admin/products'))
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products',
            });
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(result => res.redirect('/admin/products'));
}
