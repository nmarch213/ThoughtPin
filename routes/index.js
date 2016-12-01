var passport = require('passport');
var Account = require("./../models/account.js");
var router = require('express').Router();


//homepage
router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});


//gets register page
router.get('/register', function(req, res) {
  res.render('register', {});
});

//registers a user
router.post('/register', function(req,res, next){
	console.log('registering user');
  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    res.redirect('/');
	});
});

//get login page
router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

//attempt to login
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

//logs a user out.
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Middleware asking if logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
