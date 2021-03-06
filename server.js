const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const routes = require("./routes");
const app = express();
const expressValidator = require('express-validator');
const PORT = process.env.PORT || 3001;
var exphbs = require("express-handlebars");

// Authentication Packages
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var bcrypt = require('bcrypt');

// Requiring our models for syncing
var db = require("./models");
var connection = require('./config/connection.js');

app.use(express.static('public'));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(cookieParser());
// Serve up react client
app.use(express.static("client/build"));
//Add routes, both API and view

var options = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "feed_it_forward"
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'dfsafsjnjnsjf',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
        console.log(password);

        connection.query('SELECT id, password FROM users WHERE email = ?', [username], function(err, results, fields) {
            if (err) { done(err) };
            if (results.length === 0) {
                done(null, false);
            } else {
                console.log(results[0].password.toString());
                const hash = results[0].password.toString();
                bcrypt.compare(password, hash, function(err, response) {
                    if (response === true) {
                        return done(null, { user_id: results[0].id });
                    } else {
                        return done(null, false);
                    }
                });
            }

        });
    }
));

app.use(routes);
// Start the API server
// embed in sequelize startup?

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {

        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
});