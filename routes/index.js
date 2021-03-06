var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res)
{
    res.render('index', { title: 'Valley Vineyards ' });
});

router.get('/login', function(req, res, next){
    res.render('login', {message: req.flash('loginMessage')});
});

router.get('/signup', function(req, res){
    res.render('signup', {message: req.flash('signupMessage')});
});

router.get('profile', isLoggedIn, function(req, res){
    res.render('profile', {user: req.user});
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.post('/login', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
};

