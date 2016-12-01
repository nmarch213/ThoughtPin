var passport = require('passport');
var Account = require("./../models/account.js");
var router = require('express').Router();
var Blog = require("./../models/blog.js");


//NEW ROUTE
router.get("/new", function(req, res){
	res.render("blog/new");
	
})

//SHOW ROUTE
router.get("/:id", function(req, res){
	//
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			console.log("error")
			res.redirect("");
		}
		else{
			console.log("no error");
			res.render("show", {blog: foundBlog});
		}
	});
});

//Show Routes
router.get("/:id", function(req, res){
	res.send("winner");
})

//CREATE ROUTE
router.post("/new", function(req, res){
	console.log("post hit");
	//create
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err)
			res.render("blogs/new");
		else{
			res.redirect("/");
		}
	});
})

//EDIT ROUTE
router.get("/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect('');
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
})

//UPDATE ROUTE
router.put("/:id", function(req, res){
	//update and sanitize for no scripts
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err)
		{
			res.redirect("");
		} else{
			res.redirect("/" + req.params.id);
		}
	})
})

//DELETE ROUTE
router.delete("/:id", function(req, res){
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err)
		{
			res.redirect("");
		}else{
			res.redirect("");
		}
	})
	//redirect
});

//INDEX ROUTE
router.get("/", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err)
			console.log("error");
		else{
			res.render("blog/index", {blogs: blogs});
		}
	})
})





module.exports = router;