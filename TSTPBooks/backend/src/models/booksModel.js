const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    suggested_by: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        default: false,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    authors: {
        type: [String],
    },
    borrowedBy: {
        type: String
    },
    isbn: {
        type: String
    },
    isBorrowed: {
        type: Boolean,
        default: false
    },
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    pageCount: {
        type: Number
    },
    pageCountReaded: {
        type: Number
    },
    publishedDate: {
        date: {
            type: Date
        }
    },
    thumbnailUrl: {
        type: String
    },
    _class: {
        type: String
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = {
    Book
};
