const express = require("express");
const cors = require("cors");
const connectDB = require("./src/infrastructure/config/db");
const MongoBookRepository = require("./src/infrastructure/persistence/repositories/MongoBookRepository");
const bookController = require("./src/infrastructure/http/controllers/bookController");
const bookRoutes = require("./src/infrastructure/http/routes/bookRoutes");
const basicAuth = require("./src/infrastructure/http/middleware/authMiddleware");

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3001" }));

connectDB();

const repository = new MongoBookRepository();
const controller = bookController(repository);

app.use("/api/books", basicAuth, bookRoutes(controller));

app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));
