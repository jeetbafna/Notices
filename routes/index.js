var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://jeetbafna:password1@ds231991.mlab.com:31991/nodeblogauth');
var db = mongoose.connection;
/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db;
	var posts = db.get('posts');
	posts.find({},{},function(err,posts){
		res.render('index', { posts: posts });
	});
  
});

module.exports = router;
