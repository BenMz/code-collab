var express = require('express');
var router = express.Router();

/* GET index */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});
/* GET about page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: "About Let's Collab!" });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: "Login" });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: "Register new account" });
});

module.exports = router;
