# ===================================================
# FILES
# ===================================================

* package.json - metadata		(CLI : npm init)
* app.js       - main js file
* seeds.js     - test

* models
campground.js - Campground schema 
comment.js    - Comment schema
user.js       - user.js

* views
landing.ejs - Home Page
campgrounds - campgrounds.ejs, show.ejs, new.ejs
comments    - new.ejs
partials    - header.ejs, footer.ejs

* public
stylesheets - css files

* middleware
index.js - middleware functions

# ===================================================
# PROCEDURE
# ===================================================

Create package.json
Install express framework, ejs
Require express

1. Create routes
# / - shows the homepage
# /campground - GET - display all available campgrounds
#               POST - create campground	 

/campground/new - loads a form to enter details of new campground
/campground/:id - render specific campground
/campground/:id/edit - GET - render specific campground to edit
                       PUT - display updated campground 
                 	   DELETE - destroy campground


# /campgrounds/:id/comments/new - GET - display comments
#                                 POST - add comment

/campgrounds/:id/comments/:comment_id/edit - edit specific comment
/campgrounds/:id/comments/:comment_id - PUT - display updated comment
                                        DELETE - destroy comment

	
2. Create Database

3. Authentication

4. Error Handling

5. Refactoring

6. Deploying application
Heroku Cloud Platform
Login to Heroku from goorm - heroku login -i
Add required files using git 
git init (initialise repository)
git status
git add app.js
git commit -m "initial commit"
heroku create (associate a URL to the current git repository)
git remote -v (push code to the mentioned URL)
In package.json add start point in "scripts" {"start": app.js}
git push heroku master (code commited on the master branch in git is pushed to heroku)
MongoLab - hosted database that can be connected to local database


# ===================================================
# NOTES
# ===================================================

In Step 1, purple routes created before creating database

mongo
show dbs
use yelp_camp
db.user.find()



	