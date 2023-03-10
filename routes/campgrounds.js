var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX
router.get("/campgrounds",function(req,res){
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds",{campground:allCampgrounds});
		}
	})	
});

//CREATE
router.post("/campgrounds", middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {place:name, price:price, image:image, description:description, author:author};
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	})	
});

//NEW
router.get("/campgrounds/new", middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})

//SHOW
router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else{
			//console.log(foundCampground);
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id,function(err, foundCampground){
		res.render("campgrounds/edit",{campground: foundCampground});
	})	
	
});


//UPDATE CAMPGROUND
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});
});



module.exports = router;