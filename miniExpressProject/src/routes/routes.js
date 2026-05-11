const express = require("express");
const router = express.Router();
const { User } = require("../models/models");
const { Book } = require("../models/models");
const bcrypt = require("bcrypt");

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
            password: await bcrypt.hash(password, 10)
        })

        const savedUser = await newUser.save();
        console.log("Received registration request with credentials:", savedUser);
        res.send("Registration successful");

    }catch (error){
        console.log("Database Error: ", error);
        res.status(400).send("Registration failed with provided credentials:" + fullname + ", " + email + ", " + username + ", " + password);
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).send("Login failed: User not found");
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send("Login failed: Incorrect password");
        }

        console.log("Received login request with credentials:", { username, password });
        res.send("Login successful with provided credentials:" + username + ", " + password);
    } catch (error) {
        console.log("Database Error: ", error);
        res.status(500).send("An error occurred during login");
    }
});

router.get("/books", isAuthenticated, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.log("Database Error: ", error);
        res.status(500).send("An error occurred while fetching books");
    }
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;