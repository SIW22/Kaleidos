const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();


/* ----------------- DATABASE ----------------- */
const db = require('../models');


/* ------------ GET Register New ------------ */
router.get('/register', (req,res) => {
	res.render('auth/register', {
		title: 'Register',
	});
});


/* -------- POST Register Create (User) -------- */
router.post('/register', async (req,res) => {
	console.log('New User Obj = ', req.body);
	try {
		const user = await db.User.findOne({username: req.body.username});
		if (user) {
			return res.send('<h1>Account already exists, please login</h1>');
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const userData = {
			username: req.body.username,
			email: req.body.email,
			password: hash,
		}
		// res.send({salt, hash});
		const newUser = await db.User.create(userData);
		res.redirect('/auth/login');
	} catch (err) {
		res.send(err);
	}
});

/* ------------- GET Login New ------------- */
router.get('/login', (req,res) => {
	res.render('auth/login', {
		title: 'Login',
		error: '',
	});
});



/* -------- POST Login Create (Session) -------- */
router.post('/login', async (req,res) => {
	try {
		const user = await db.User.findOne({username: req.body.username});
		console.log(user);
		if (!user) {
			return res.render('auth/login', {
				title: 'Login',
				error: 'Invalid Credentials',
			});
		}
		const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordsMatch) {
			return res.render('auth/login', {
				title: 'Login',
				error: 'Invalid Credentials',
			});
		}
		console.log('user confirmed', req.session);
		req.session.currentUser = user._id;
		console.log(req.session);
		res.redirect('../products');
	} catch (err) {
		res.send(err);
	}
});


/* ------- GET Logout Destroy (Session) ------- */
router.get('/logout', async (req,res) => {
	try {
		await req.session.destroy();
		res.redirect('/');
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;