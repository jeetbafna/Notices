var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var db = require('monk')('mongodb://jeetbafna:password1@ds231991.mlab.com:31991/nodeblogauth');

router.get('/show/:category', function(req, res, next) {
  var posts = db.get('posts');
  posts.find({category: req.params.category},{},function(err, posts){
    res.render('index',{
        'title': req.params.category,
        'posts': posts
       });
  });
   
});


router.get('/add', function(req, res, next) {
	
		res.render('addcategory',{
  	    'title': 'Add category',
  	    
       });
});
router.post('/add', function(req, res, next) {
  // Get Form Values
  var name = req.body.name;
  


  //form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  
  //CHeck errors
  var errors = req.validationErrors();
  if(errors){
  	res.render('addpost' ,{
  		"errors": errors,

  	});
  } else{
  	var categories = db.get('categories');
  	categories.insert({
  		"name": name,
  		
  	},function(err, post){
  		if(err){
  			res.send(err);
  		} else{
  			req.flash('success', 'Category Added');
  			res.location('/');
  			res.redirect('/');
  		}
  	});
  }
});

module.exports = router;
