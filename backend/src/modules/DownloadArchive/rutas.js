const express = require("express");
const path = require("path");
const router = express.Router();
const respuesta = require("../../red/respuestas");


router.get("/:id", download);

async function download(req, res) {

  const folder = process.env.NODE_ENV === 'development' ? '../../../document_dev' : '../../../document_prod'

  let isRuta = path.join(__dirname, folder).replace(/\\/g, "/");

  const nameArchive = req.params.id

  try {
    const file = `${isRuta}/${nameArchive}`; // Cambia esto a la ruta de tu archivo
    res.download(file); // Set disposition and send it.
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

module.exports = router;
