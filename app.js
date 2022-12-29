var express 	   = require("express"),
	app 		   = express(),
	bodyParser 	   = require("body-parser"),
	mongoose 	   = require("mongoose"),
	flash		   = require("connect-flash"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override"),
	Campground     = require("./models/campground"),
	seedDB		   = require("./seeds"),
	User 		   = require("./models/user"),
	Comment 	   = require("./models/comment");

//requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes    = require("./routes/comments"),
	authRoutes       = require("./routes/index");

//misc requirements
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();		//see the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Shhh...it's a secret.",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to check if the user is logged in
//calls the function on every single route
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//using requires routes
app.use(campgroundRoutes);

/*app.use("/campgrounds",campgroundRoutes);
before all subroutes, campgrounds will be added in campgrounds.js. */

app.use(commentRoutes);
app.use(authRoutes);

//listening to the mentioned port 
app.listen(3000,function(){
// app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Yelp Server has started.");
});