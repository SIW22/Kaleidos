const express = require('express');
const router = express.Router();


/* ----------------- DATABASE ----------------- */
const db = require('../models');


// PATH = '/products'


/* ------------ GET Products Index ------------ */
router.get('/', (req, res) => {
    db.Product.find({}, (err, allProducts) => {
        if (err) {
            return res.send(err);
        }
        res.render('products/index', {
            products: allProducts,
            title: 'Products',
        });
    });
});


/* -------------- GET Products New -------------- */
router.get('/new', (req, res) => {
    db.Product.find({}, (err, allProducts) => {
        if (err) {
            return res.send(err);
        }
        res.render('products/new', {
            products: allProducts,
            title: 'New Product',
        });
    });
});


/* ------------ POST Products Create ------------ */
router.post('/', (req, res) => {
    console.log('hi James!');
    db.Product.create(req.body, (err, newProduct) => {
        if (err) {
            return res.send(err);
        }
        res.redirect('/products')
        console.log('hello.');
        });
    });


/* ------------- GET Products Show ------------- */
router.get('/:id', (req, res) => {
    db.Product.findById(req.params.id, (err, foundProduct) => {
        if (err) {
            return res.send(err);
        }
        res.render('products/show', {
            product: foundProduct,
            title: 'Product Details',
        });
    });
});


/* ------------- GET Products Edit ------------- */
router.get('/:id/edit', (req, res) => {
    db.Product.findById(req.params.id, (err, foundProduct) => {
        if (err) {
            return res.send(err);
        }
        res.render('products/edit', {
            product: foundProduct,
            title: 'Edit Product',
        });
    });
});


/* ------------ PUT Products Update ------------ */
router.put('/:id/', (req, res) => {
    db.Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedProduct) => {
            if (err) {
                return res.send(err);
            }
            res.redirect(`/products/${updatedProduct.id}`);
        });
});


/* ---------- DELETE Products Destroy ---------- */
router.delete('/:id', (req, res) => {
    db.Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        if (err) {
            return res.send(err);
        }
        res.redirect('/products');
    });
});



module.exports = router;