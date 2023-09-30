const Book = require("../db/Book");
const boom = require("@hapi/boom");
const fs = require('fs');
const path = require('path');

async function uploadFile(req, res, next) {
  if (!req.file){
    return next(boom.badRequest("A file was not sent"));
  }
  const data = {
    ...req.body,
    "filename": req.file.originalname
  }
  const newBook = new Book(data);
  await newBook.save();

  res.json(newBook);
}

const uploadsDir = path.join(__dirname, "..", "uploads");

async function downloadFile(req, res, next){
  const { id } = req.query;
  const book = await Book.findOne({_id: id});
  
  if (!book){
    return next(boom.notFound(`The book with id "${id}" does not exist`));
  }

  const filepath = path.join(uploadsDir, book.filename);
  if(!fs.existsSync(filepath)){
    return next(boom.notFound(`The book with id "${id}}" exists in the database but the file is not on the server`));
  }

  res.download(filepath);
}

module.exports = {
  uploadFile,
  downloadFile
};