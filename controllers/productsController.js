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
    db.Product.create(req.body, (err, newProduct) => {
        if (err) {
            return res.send(err);
        }
        res.redirect('/products', {
            product: newProduct,
        });
    });
});



/* ------------- GET Products Show ------------- */
// router.get('/:id', (req, res) => {
//     db.Product.findById(req.params.id, (err, foundProduct) => {
//         if (err) {
//             return res.send(err);
//         }
//         res.render('products/show', {
//             product: foundProduct,
//             title: 'Product Details',
//         });
//     });
// });



/* ------------- GET Products Edit ------------- */




/* ------------ PUT Products Update ------------ */




/* ---------- DELETE Products Destroy ---------- */







module.exports = router;