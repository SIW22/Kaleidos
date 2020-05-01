const express = require('express');
const router = express.Router();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const cloudinary = require('cloudinary');


/* ----------------- DATABASE ----------------- */
const db = require('../models');


// PATH = '/products'

/* ----------------- CONFIG ----------------- */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


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
    }).sort({[req.query.sort]: req.query.order});
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
router.post('/', multipartMiddleware, (req,res) => {
    let body = (req.body);
    cloudinary.uploader.upload(req.files.image.path, (result) => {
        console.log('from cloudinary', result);
        body = {
            ...body,
            image: result.secure_url
        }
        console.log(body);
        db.Product.create(body, (err, newProduct) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/products');
        });
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
router.put('/:id/', multipartMiddleware, (req, res) => {
    db.Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedProduct) => {
            if (err) {
                return res.send(err);
            }
            res.redirect(`/products/${updatedProduct.id}`);
        }
    )
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