const Book = require("../db/Book");

async function uploadFile(req, res) {
  const data = {
    ...req.body,
    "filename": req.file.originalname
  }
  const newBook = new Book(data);
  await newBook.save();

  res.json(newBook);
}

module.exports = {
  uploadFile
};