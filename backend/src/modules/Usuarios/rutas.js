const express = require("express");

const seguridad = require("../../red/seguridad");
const respuesta = require("../../red/respuestas");
const controller = require("./controller");

const router = express.Router();

router.get("/", seguridad(), all); //select todos registros

router.get("/", seguridad(), unique); //select paramatrizado

router.put("/delete", seguridad(), del); //elimina

router.post("/", seguridad(), insert); //inserta

router.put("/", seguridad(), update); //actualiza

async function all(req, res) {
  try {
    const items = await controller.all();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function unique(req, res) {

  try {
    const items = await controller.unique(req.body);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}


async function del(req, res, next) {
  try {
    const items = await controller.del(req.body);
    respuesta.success(req, res, "ITEM ELIMINADO SASTIFACTORIAMENTE", 200);
  } catch (err) {
    next(err);
  }
}

async function insert(req, res, next) {
  try {
    const items = await controller.insert(req.body);

      mensaje = "ITEM GUARDADO CON EXITO";
      
    respuesta.success(req, res, mensaje, 201);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const items = await controller.update(req.body);

    mensaje = "ITEM ACTUALIZADO CON EXITO";

    respuesta.success(req, res, mensaje, 201);
  } catch (err) {
    respuesta.error(req, res, err, 500);
    //  next(err);
  }
}

module.exports = router;
