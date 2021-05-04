//jshint esversion:8
var express = require('express');
var router = express.Router();


// if (express().get("env") === "development") require("dotenv/config");

/* GET users listing. */
router.get("/create-account", (req, res) => {
        res.render("register");
    })
    .get("/login", (req, res) => {
        res.render("login");
    })
    .get("/login/forgot-password/:token", (req, res) => {
        // let token = jwt.verify(req.params.token, process.env.JWT_SECRET);
        // console.log(token);

        res.render("reset-password");
    })
    .get('/my-profile', function(req, res, next) {
        res.render('profile');
    })
    .get("/product-single", (req, res) => {
        res.render('product-single');
    })
    .get("/my-wishlist", (req, res) => {
        res.render('wishlist');
    });
module.exports = router;