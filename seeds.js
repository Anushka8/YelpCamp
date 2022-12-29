var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		place:"Rajmachi Fort",
		image:"https://dmgupcwbwy0wl.cloudfront.net/system/images/000/416/809/eb87263172d80bb9716fb663345cb248/original/Rajmachi_Trek-4.jpg?1587124733",
		description: "Rajmachi Fort is one of the many historical forts in the rugged hills of Sahyadri mountains."
	},
	{
		place:"Lohagad Fort",
		image:"https://www.holidify.com/images/cmsuploads/compressed/Lohagad_fort_20170802171542.jpg",
		description: "DescriptionLohagad is one of the many hill forts of Maharashtra state in India. "
	},
	{
		place:"Mahuli Fort",
		image:"https://dmgupcwbwy0wl.cloudfront.net/system/images/000/219/935/6cff44fbc95905c5ccc3ff5b4bb70ff8/x1000gt/Mahuli_Fort_From_Pivali_End.JPG?1561216242",
		description: "Mahuli Fort at 2815 ft, is a popular trekking destination and a paradise for rock climbers because of many nearby pinnacles with interesting names like Vazir, Vishnu, etc., given by the local trekking and climbing fraternity."
	}
];

function seedDB(){
	//remove existing campgrounds
	Campground.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed Campgrounds.");
		//create new campgrounds after deleting exiting ones
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				} else{
					console.log("Campgrounds added");
					//add comments
					Comment.create(
						{
							text: "Place is great. Wish there was Ichiraku Ramen here.",
							author: "Naruto"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("New comment added.");
							}
						}
					);
				}
			});
		});
	});
		
		
}

module.exports = seedDB;
