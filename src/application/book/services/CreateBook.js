class CreateBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(bookData) {
        if (bookData.review && bookData.review.length > 500) {
            throw new Error("El review no puede superar los 500 caracteres");
        }
        return await this.bookRepository.save(bookData);
    }
}

module.exports = CreateBook;
