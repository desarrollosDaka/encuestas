const express = require("express");

const seguridad = require("../../red/seguridad");
const respuesta = require("../../red/respuestas");
const controller = require("./controller");

const router = express.Router();

router.post("/", insert); //inserta

router.get("/unique", unique); //select paramatrizado


async function insert(req, res, next) {

  const userIp = req.ip;
  
  try {
    const items = await controller.insert(req.body,userIp);

      mensaje = "ITEM GUARDADO CON EXITO";
      
    respuesta.success(req, res, mensaje, 201);
  } catch (err) {
    next(err);
  }
}


async function unique(req, res) {

  try {
    const items = await controller.unique(req.query);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

module.exports = router;
