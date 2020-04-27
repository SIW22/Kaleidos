const express = require('express');
// image upload library - handles getting formdata from requests
// const multer = require('multer');
// const upload = multer({dest: __dirname + 'uploads/'});
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
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
// app.use('/static', express.static(__dirname + '/node_modules/'));
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

// Image Upload Route - source: niinpatel
// app.post('/upload', upload.single('photo', (req, res) => {
//     if (req.file) {
//         res.json(req.file);
//     } else {
//         return res.send(err);
//     }
// }));

/* ---------------- EVENT LISTENER ---------------- */
app.listen(port, () => console.log(`Server is running on port ${port}`));