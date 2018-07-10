var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://jeetbafna:password1@ds231991.mlab.com:31991/nodeblogauth');

/* GET home page. */
router.get('/', function(req, res, next) {
	var posts = db.get('posts');
	posts.find({},{},function(err,posts){
		res.render('index', { posts: posts });
	});
  
});

module.exports = router;
