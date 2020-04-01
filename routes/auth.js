var express = require('express');
var router = express.Router();
var passport = require('passport');
const {
  check,
  validationResult
} = require('express-validator');
const User = require('../models/User');

router.route('/login')
	.get(function(req, res, next) {
		res.render('login', { title: "Login" });
	})
	.post(passport.authenticate('local',{
		failureRedirect: '/login'
	}),function(req, res) {
		res.redirect('/');
	});

router.route('/register')
	.get(function(req, res, next) {
		res.render('register', { title: "Register new account" });
	})
	.post([
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Confirm Password is required').custom((value,{req, loc, path}) => {
            if (value !== req.body.confirmPassword) {
                // throw error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
  ],function(req, res, next) {
		var errors = validationResult(req);
		if(!errors.isEmpty()){
			res.render('register', {
				name: req.body.name,
				email: req.body.email,
				errorMessages: errors.errors
			});
		} else {
			var user = new User();
			user.name = req.body.name;
			user.email = req.body.email;
			user.setPassword(req.body.password);
			user.save(function(err) {
				if(err){
					res.render('register', {errorMessages: err});
				} else {
					res.redirect('/login');
				}
			});
		}
	});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;