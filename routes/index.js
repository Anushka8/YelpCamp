var express 	= require("express");
var router 		= express.Router();
var passport 	= require("passport");
var User 		= require("../models/user");

router.get("/",function(req,res){
	res.render("landing");
});

/*=============================================
	AUTH ROUTES
=============================================*/

//SHOW REGISTER FORM
router.get("/register",function(req,res){
	res.render("register");
});

//HANDLE REGISTER LOGIC
router.post("/register",function(req,res){
	var newUser = new User({username : req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		} else{
			req.flash("success","Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		}
	})
});

//SHOW LOGIN FORM
router.get("/login",function(req,res){
	res.render("login");
});

//HANDLE LOGIN LOGIC

//Syntax: app.post("/login",middleware,callback)
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	
	}), function(req,res){
	
});

//HANDLE LOGOUT LOGIC
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "Logged out successfully!");
	res.redirect("/campgrounds");
});


module.exports = router;