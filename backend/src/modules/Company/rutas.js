const express = require("express");

const seguridad = require("../../red/seguridad");
const respuesta = require("../../red/respuestas");
const controller = require("./controller");

const router = express.Router();

router.get("/", seguridad(), all); //select todos registros

async function all(req, res) {
  try {
    const items = await controller.all();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}



module.exports = router;
