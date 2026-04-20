const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
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

const users_Books = new Schema({
    user_Id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    bookId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    lintDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const User_Book = mongoose.model("User_Book", users_Books);

module.exports = {
    User,
    Book,
    User_Book
};

