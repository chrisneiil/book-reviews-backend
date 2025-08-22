class GetAllBooks {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(filters = {}) {
        return await this.bookRepository.findAll(filters);
    }
}

module.exports = GetAllBooks;
