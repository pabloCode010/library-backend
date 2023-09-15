function uploadFile(req, res) {
  console.log(req.file);
  res.send("Datos del archivo recibidos con éxito.");
}

module.exports = {
  uploadFile
};