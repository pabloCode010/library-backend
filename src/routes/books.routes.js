const { Router } = require("express");
const upload = require("../middlewares/files");
const { uploadFile } = require("../controllers/books-files");

const router = Router();

router.post("/upload", upload.single("filename"), uploadFile);

module.exports = router;