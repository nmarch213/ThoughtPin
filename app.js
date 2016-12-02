var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var credentials = require('./credentials.js');
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var helpers = require('handlebars-helpers')();

var app = express();

// database configuration
var dbSettings = require("./lib/database.js");
dbSettings.populateDBSettings(app);

// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Set up body parser and cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: [credentials.cookieSecret]}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.use(express.static(__dirname + '/public'));

// Set up authentication
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
var Account = require("./models/account.js");
passport.use(new LocalStrategy(Account.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//Routes
var indexRoutes = require("./routes/index.js");
var blogRoutes = require("./routes/blog.js");

// index routes
app.use(indexRoutes);
// blog routes
app.use("/blogs", blogRoutes);



app.listen(app.get('port'), function(){
  console.log( 'Thought Pin started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});