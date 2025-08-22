class SearchBooks {
    constructor(openLibraryService, bookRepository) {
        this.openLibraryService = openLibraryService;
        this.bookRepository = bookRepository;
    }

    async execute(query) {
        // buscar en OpenLibrary
        const results = await this.openLibraryService.searchBooks(query);

        // traer los libros guardados en mi biblioteca
        const savedBooks = await this.bookRepository.findAll();

        // si algún libro buscado ya está guardado, reemplazar cover por el base64 de Mongo
        return results.map(book => {
            const found = savedBooks.find(sb => sb.title.toLowerCase() === book.title.toLowerCase());
            if (found) {
                return { ...book, cover: found.cover };
            }
            return book;
        });
    }
}

module.exports = SearchBooks;
