var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");


router.get("/",function(req,res){//landing page.....has to be set on root path
    res.render("landing")//no need to write .ejs...using view engine
});




//Auth routes

//show register

router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to Yelpcamp "+user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",                                               {
	      successRedirect:"/campgrounds",
	      failureRedirect:"/login"
        }),function(req,res){	
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged You Out")
	res.redirect("campgrounds");
});




module.exports=router;