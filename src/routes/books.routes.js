const { Router } = require("express");
const upload = require("../middlewares/upload-file");
const { uploadFile } = require("../controllers/books-files");

const router = Router();

router.post("/upload", upload.single("bookFile"), uploadFile);

module.exports = router;