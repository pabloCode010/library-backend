const { Router } = require("express");
const router = Router();

const upload = require("../middlewares/upload-file");
const { uploadFile } = require("../controllers/books-files");
const isAuthenticated = require("../middlewares/is-authenticated");
const isAdmin = require("../middlewares/is-admin");

router.post("/upload",
  isAuthenticated,
  isAdmin,
  upload.single("book-file"),
  uploadFile);

module.exports = router;
