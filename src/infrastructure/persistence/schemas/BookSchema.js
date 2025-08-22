const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    cover: String,  // base64
    review: String,
    rating: Number,
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
