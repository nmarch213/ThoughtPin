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
  res.render('/login', {user: req.user});
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

// // catch 404 and forward to error handler
// router.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (router.get('env') === 'development') {
//   router.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('index/error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// router.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('index/error', {
//     message: err.message,
//     error: {}
//   });
// });

// Middleware asking if logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
