var express = require('express');
var router = express.Router();
const Session = require('../models/Session');

router.get('/createSession', function(req, res) {
	var newSession = new Session();

	newSession.save(function(err, data){
		console.log(err)
		if(err){
			res.render('error');
		} else {
			res.redirect('/session/'+data._id);
		}
	});
});

router.get('/session/:id', function(req, res){
	if (req.params.id){
		Session.findOne({_id: req.params.id}, function(err, data){
			if(err){
				res.render('error');
			}
			if(data){
				res.render('session', {data: data});
			} else {
				res.render('error');
			}
		});
	} else {
		res.render('error');
	}
});

module.exports = router;