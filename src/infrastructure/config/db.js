const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/books");
        console.log("Conectado a MongoDB");
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
        process.exit(1);
    }
}

module.exports = connectDB;
