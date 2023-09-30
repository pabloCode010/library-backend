const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, default: null },
  publicationYear: { type: Number, default: null },
  description: { type: String, default: "" },
  coverImageURL: { type: String, required: true },
  filename: { type: String, required: true },
});

const Book = new model("book", bookSchema);

module.exports = Book;