const express = require("express");
const router = express.Router();
const { Book } = require("../models/booksModel");

// Create a new book
router.post("/books/create", async (req, res) => {
    try {
        const { title, author, price, pageCount, pageCountReaded, format, status, suggested_by, finished } = req.body;

        // Validate required fields
        if (!title || !author || !format || !status || !suggested_by) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate pages read is not greater than total pages
        if (pageCountReaded > pageCount) {
            return res.status(400).json({ message: "Pages read cannot be greater than total pages" });
        }

        const newBook = new Book({
            title,
            author,
            price,
            pageCount,
            pageCountReaded,
            format,
            status,
            suggested_by,
            finished: pageCountReaded === pageCount ? true : finished || false,
            categories: [],
        });

        const savedBook = await newBook.save();
        console.log("Book created successfully:", savedBook._id);
        res.status(201).json(savedBook);

    } catch (error) {
        console.error("Database Error:", error);
        res.status(400).json({ message: "Failed to create book", error: error.message });
    }
});

// Get all books
router.get("/books/all", async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(400).json({ message: "Failed to fetch books", error: error.message });
    }
});

// Get book by ID
router.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(400).json({ message: "Failed to fetch book", error: error.message });
    }
});

// Delete a book
router.delete("/books/delete", async (req, res) => {
    const { id } = req.body;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        console.log("Book deleted successfully:", deletedBook._id);
        res.status(200).json({ message: "Book deleted successfully", book: deletedBook });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(400).json({ message: "Deletion failed", error: error.message });
    }
});

// Update a book
router.put("/books/update", async (req, res) => {
    const { id, ...updateData } = req.body;

    try {
        // Auto-calculate finished based on pages read
        if (updateData.pageCountReaded !== undefined && updateData.pageCount !== undefined) {
            updateData.finished = updateData.pageCountReaded === updateData.pageCount ? true : updateData.finished || false;
        } else if (updateData.pageCountReaded !== undefined) {
            const book = await Book.findById(id);
            if (book) {
                updateData.finished = updateData.pageCountReaded === book.pageCount ? true : book.finished;
            }
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        console.log("Book updated successfully:", updatedBook._id);
        res.status(200).json(updatedBook);

    } catch (error) {
        console.error("Database Error:", error);
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});

module.exports = router;