const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/ensureAuthMiddleware");
const { Book } = require("../models/models");

// Define route for the home page
router.get("/login", (req, res) => {
    res.render("login", { name: "Timothy" });
});

router.get("/register", (req, res) => {
    res.render("register", { name: "Timothy" });
});

router.get("/books",ensureAuthenticated ,async (req,res) => {
    try{
        const allBooks = await Book.find({});
        res.render("books",{
            books: allBooks
        });
    }catch(err){
        console.error(error);
        res.status(500).send("Error fetching books from database");
    }
})



module.exports = router;