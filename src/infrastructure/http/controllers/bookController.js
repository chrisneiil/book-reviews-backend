const CreateBook = require("../../../application/book/services/CreateBook");
const GetAllBooks = require("../../../application/book/services/GetAllBooks");
const UpdateBook = require("../../../application/book/services/UpdateBook");
const DeleteBook = require("../../../application/book/services/DeleteBook");
const SearchBooks = require("../../../application/book/services/SearchBooks");
const OpenLibraryService = require("../../external/OpenLibraryService");
const SaveSearch = require("../../../application/search/services/SaveSearch");
const GetLastSearch = require("../../../application/search/services/GetLastSearch");
const MongoSearchRepository = require("../../persistence/repositories/MongoSearchRepository");

module.exports = (bookRepository) => {

    const searchRepository = new MongoSearchRepository();
    const openLibraryService = new OpenLibraryService();

    return {
        create: async (req, res) => {
            try {
                const useCase = new CreateBook(bookRepository);
                const savedBook = await useCase.execute(req.body);
                res.status(201).json(savedBook);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        },

        getAll: async (req, res) => {
            try {
                const useCase = new GetAllBooks(bookRepository);
                const { title, author, withReview, sort } = req.query;
                const filters = {};

                if (title) filters.title = new RegExp(title, "i");
                if (author) filters.author = new RegExp(author, "i");
                if (withReview === "true") filters.review = { $exists: true, $ne: "" };

                let books = await useCase.execute(filters);

                if (sort === "rating_asc") books = books.sort((a, b) => a.rating - b.rating);
                if (sort === "rating_desc") books = books.sort((a, b) => b.rating - a.rating);

                res.json(books);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },

        update: async (req, res) => {
            try {
                const useCase = new UpdateBook(bookRepository);
                const updated = await useCase.execute(req.params.id, req.body);
                res.json(updated);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        },

        remove: async (req, res) => {
            try {
                const useCase = new DeleteBook(bookRepository);
                await useCase.execute(req.params.id);
                res.json({ message: "Libro eliminado con éxito" });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },

        search: async (req, res) => {
            try {
                const { q } = req.query;
                if (!q) {
                    return res.status(400).json({ error: "Debe enviar un parámetro de búsqueda 'q'" });
                }

                // Guardar búsqueda
                const saveSearch = new SaveSearch(searchRepository);
                await saveSearch.execute(q);

                // Ejecutar búsqueda en OpenLibrary
                const useCase = new SearchBooks(openLibraryService, bookRepository);
                const results = await useCase.execute(q);

                if (results.length === 0) {
                    return res.json({ message: "No encontramos libros con el título ingresado" });
                }

                res.json(results);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },

        lastSearch: async (req, res) => {
            try {
                const useCase = new GetLastSearch(searchRepository);
                const results = await useCase.execute();
                res.json(results);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
    }
};
