const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const cloudinary = require('cloudinary');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

/* ---------------- CONFIGS ---------------- */
// dotenv
require('dotenv').config();



const port = process.env.PORT || 4000;
const app = express();

console.log('The value of test = ', process.env.NEW_TEST);

/* ---------------- CONTROLLERS ---------------- */
const productsController = require('./controllers/productsController');

const authController = require('./controllers/authController');


/* -------------- SET VIEW ENGINE -------------- */
app.set('view engine', 'ejs');

// allows us to use CSS
app.use(express.static('views/partials'))
app.use(express.static('public'));

/* ---------------- MIDDLEWARE ---------------- */
// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET, // how we verify we created this cookie
    resave: false,
    saveUninitialized: false,
}));


// Method Override
app.use(methodOverride('_method'));


// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



/* ---------------- ROUTES ---------------- */
// GET Root Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

// Products Route
app.use('/products', productsController);

// Auth Route
app.use('/auth', authController);



/* ---------------- EVENT LISTENER ---------------- */
app.listen(port, () => console.log(`Server is running on port ${port}`));