const express = require("express");
const router = express.Router();
const passport = require('passport');
const { User } = require("../models/models");

router.post("/register", async (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try{
        const newUser = new User({
            fullname,
            email,
            username,
            password
        })

        const savedUser = await newUser.save();
        console.log("Received registration request with credentials:", savedUser);
        res.send("Registration successful with provided credentials:", savedUser);

    }catch (error){
        console.log("Database Error: ", error);
        res.status(400).send("Registration failed with provided credentials:" + fullname + ", " + email + ", " + username + ", " + password);
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/'
}));

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect("/login");;
    });
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
