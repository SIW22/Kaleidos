const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const dropzone = require('dropzone');

const port = process.env.PORT || 4000;
const app = express();


/* ---------------- CONTROLLERS ---------------- */
const productsController = require('./controllers/productsController');

const authController = require('./controllers/authController');


/* -------------- SET VIEW ENGINE -------------- */
app.set('view engine', 'ejs');


/* ---------------- MIDDLEWARE ---------------- */
// Express Session
app.use(session({
    secret: 'bsrhgbksjrbfkjbrd',
    resave: false,
    saveUninitialized: false,
}));


// Method Override
app.use(methodOverride('_method'));


// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Dropzone
app.use(dropzone());


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