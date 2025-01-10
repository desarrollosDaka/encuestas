const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";

const DB = require(dataBase);

const express = require("express");

const seguridad = require("../../red/seguridad");
const respuesta = require("../../red/respuestas");
const controller = require("./controller");

const router = express.Router();

router.get("/", seguridad(), all); //select todos registros

router.get("/unique", seguridad(), unique); //select paramatrizado

router.put("/delete", seguridad(), del); //elimina

router.post("/",seguridad(), insert); //inserta

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

  let rows = []

  // if (req.query.UrlSurvey && req.query.Estado) {

  //   const data = [];
  //   data.ip = req.ip.split(':').pop();
  //   data.UrlSurvey = req.query.UrlSurvey;
  //   rows = await getIPAddress(data);
  // }

  try {
    const items = await controller.unique(req.query);
    if (rows.length > 0) {
      return res.status(400).send('Ya ha respondido la encuesta');
    }
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

async function getIPAddress(data) {
  // Verificar si el usuario ya respondió la encuesta
  const where = {
    UrlSurvey: data.UrlSurvey,
    ip: data.ip,
  };

  return DB.getIPAddress(where);
}

module.exports = router;
