const axios = require("axios");

class OpenLibraryService {
    async searchBooks(query) {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
        const response = await axios.get(url);

        return response.data.docs.map(book => ({
            key: book.key,
            title: book.title,
            author: book.author_name ? book.author_name.join(", ") : "Desconocido",
            year: book.first_publish_year || null,
            cover: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null
        }));
    }
}

module.exports = OpenLibraryService;
