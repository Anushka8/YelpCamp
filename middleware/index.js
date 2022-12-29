var Campground = require("../models/campground");
var Comment = require("../models/comment");
//empty object
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	//is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				req.flash("error","Campground not found");
				res.redirect("back");
			} else{
				//does user own the campground
				//foundCampground.author.id === req.user._id
				//cannot be used since LHS is an object of mongoose and RHS is a string
				if(foundCampground.author.id.equals(req.user._id)){
					next();	
				} else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}	
			}
		});
	} else{
		req.flash("error", "Please Login First!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentsOwnership = function(req,res,next){
	//is user logged in?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back");
			} else{
				//does user own the campground
				//foundCampground.author.id === req.user._id
				//cannot be used since LHS is an object of mongoose and RHS is a string
				if(foundComment.author.id.equals(req.user._id)){
					next();	
				} else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}	
			}
		});
	} else{
		req.flash("error", "Please Login First!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");	
}


module.exports = middlewareObj;