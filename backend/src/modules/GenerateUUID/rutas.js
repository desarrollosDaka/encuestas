const express = require("express");

const respuesta = require("../../red/respuestas");
const controller = require("./controller");
const seguridad = require("../../red/seguridad");

const router = express.Router();

router.get("/:id", unique);

router.put("/", del);

router.post("/", insert);

async function insert(req, res, next) {
  try {
    const items = await controller.insert(req.body);

    mensaje = "ITEM GUARDADO CON EXITO";

    respuesta.success(req, res, mensaje, 201);
  } catch (err) {
    //  respuesta.error(req,res,err,500);
    next(err);
  }
}

async function unique(req, res) {
  try {
    const items = await controller.unique(req.params.id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function del(req, res, next) {

  try {
    const items = await controller.del(req.body);
    respuesta.success(req, res, "Item Eliminado Sastifactoriamente", 200);
  } catch (err) {
    //  respuesta.error(req,res,err,500);
    next(err);
  }
}

module.exports = router;
