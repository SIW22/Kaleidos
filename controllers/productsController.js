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
    });
});

/* Sort By Category */
// router.get('/category', (req, res) => {
//     db.Product.find().sort({name: 1}, (err, ProductsByName) => {
//         if (err) {
//             return res.send(err);
//         }
//         res.render('products/name', {
//             products: ProductsByName,
//             title: 'Items By Name',
//         });
//     });
// });

/* Sort By Name */
router.get('/name', (req, res) => {
    db.Product.find().sort({name: 1}, (err, ProductsByName) => {
        if (err) {
            return res.send(err);
        }
        res.render('products/name', {
            products: ProductsByName,
            title: 'Items By Name',
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
            console.log('hello');
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

// UPDATE IMAGE
// router.put('/:id/', multipartMiddleware, (req, res) => {
//     console.log(req.body);
//     console.log(req.files.image);
//     console.log(req.files.image.originalFilename);
//     if (req.files.image.originalFilename) {
//         let body = (req.body);
//         cloudinary.uploader.upload(req.files.image.path,
//             (result) => {
//                 console.log('from cloudinary', result);
//                 body = {
//                     ...body,
//                     image: result.secure_url
//                 }
//                 console.log(body);
//                 db.Product.findByIdAndUpdate(
//                     req.params.id,
//                     body,
//                     {new: true},
//                     (err, updatedProduct) => {
//                         if (err) {
//                             return res.send(err);
//                         }
//                         res.redirect(`/products/${req.params.id}`);
//                     }
//                 )
//             }) 
//         } 
// })

// CAN UPDATE DESCRIPTION BUT NOT IMAGE
router.put('/:id/', multipartMiddleware, (req, res) => {
    console.log(req.body);
    console.log(req.files.image);
    console.log(req.files.image.originalFilename);
    let body = (req.body);
    cloudinary.uploader.upload(req.files.image.path,
        (result) => {
            console.log('from cloudinary', result);
            body = {
                ...body,
                image: result.secure_url
            }
            console.log(body);
            
        })
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
    
})


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