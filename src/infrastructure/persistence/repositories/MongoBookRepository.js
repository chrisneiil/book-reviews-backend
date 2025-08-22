const BookModel = require("../schemas/BookSchema");

class MongoBookRepository {
    async save(bookData) {
        const book = new BookModel(bookData);
        return await book.save();
    }

    async findAll(filters = {}) {
        return await BookModel.find(filters);
    }

    async findById(id) {
        return await BookModel.findById(id);
    }

    async update(id, data) {
        return await BookModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await BookModel.findByIdAndDelete(id);
    }
}

module.exports = MongoBookRepository;
