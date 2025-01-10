const express = require("express");

const seguridad = require("../../red/seguridad");
const respuesta = require("../../red/respuestas");
const controller = require("./controller");

const router = express.Router();

router.post("/", insert); //inserta

router.get("/unique", unique); //select paramatrizado

router.get("/paginator", paginator); //select paramatrizado con paginado

router.get("/paginator/totalRows", paginatorTotalRows); //select contador paramatrizado

router.put("/", seguridad(), update); //actualiza

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

async function update(req, res, next) {

  try {
    const items = await controller.update(req.body);

    mensaje = "ITEM ACTUALIZADO CON EXITO";

    respuesta.success(req, res, mensaje, 201);
  } catch (err) {
    respuesta.error(req, res, err, 500);
     next(err);
  }
}

async function paginator(req, res) {

  try {
    const items = await controller.paginator(req.query);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function paginatorTotalRows(req, res) {

  console.log(req)
  try {
    const items = await controller.paginatorTotalRows(req.query);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}



module.exports = router;
