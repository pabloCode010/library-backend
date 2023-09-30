const { Router } = require("express");
const router = Router();

const upload = require("../middlewares/upload-file");
const { uploadFile, downloadFile } = require("../controllers/books-files");
const wrapper = require("../err/wrapper");
const validateSchema = require("../middlewares/validate-data");

const isAuthenticated = require("../middlewares/is-authenticated");
const isAdmin = require("../middlewares/is-admin");
const { searchById } = require("../validations/authenticate-request-body");

router.post("/upload",
  isAuthenticated,
  isAdmin,
  upload.single("book-file"),
  wrapper(uploadFile)
  );

router.get("/download",
  validateSchema("query", searchById),
  wrapper(downloadFile));

module.exports = router;