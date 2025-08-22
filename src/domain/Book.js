
class Book {
    constructor({ id, title, author, year, cover, review, rating }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.cover = cover;
        this.review = review;
        this.rating = rating;
    }
}
module.exports = Book;