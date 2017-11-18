const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const db = require("../models");

const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
var connection = require('../config/connection.js');
// API Routes
router.use("/api", apiRoutes);

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.user);
	console.log(req.isAuthenticated());
	res.render('home', { title: 'Home' });
});

router.get('/profile', authenticationMiddleware(), function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'LogIn' });
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/login'
})); 

router.get('/logout', function(req, res, next) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.post('/register', function(req, res, next) { 
	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 4-100 characters long.').len(4, 100);
	req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
    	console.log(`errors: ${JSON.stringify(errors)}`);

    	res.render('register', { 
    		title: 'Registration Error', 
    		errors: errors
    	});
    } else {
    	const email = req.body.email;
	    const password = req.body.password;

	    bcrypt.hash(password, saltRounds, function(err, hash) {
			connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], function(
				error, results, fields) {
				if (error) throw error;
				connection.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields) {
					if (error) throw error;

					const user_id = results[0];
					console.log(results[0]);
					req.login(user_id, function(err) {
						res.redirect('/');
					})
				});
			})
		});   
    }
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.username: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}
// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
