class UpdateBook {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    async execute(id, data) {
        if (data.review && data.review.length > 500) {
            throw new Error("El review no puede superar los 500 caracteres");
        }
        return await this.bookRepository.update(id, data);
    }
}

module.exports = UpdateBook;
