const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema({
    query: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Search", SearchSchema);
