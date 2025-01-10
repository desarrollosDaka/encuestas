const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";

const DB = require(dataBase);

const express = require("express");

const respuesta = require("../../red/respuestas");
const controller = require("./controller");

const router = express.Router();

router.get("/uniqueSurvey", uniqueSurvey); //select paramatrizado
router.get("/uniqueQuestions", uniqueQuestions); //select paramatrizado
router.get("/uniqueAnswer", uniqueAnswer); //select paramatrizado
router.put("/survey", update); //actualiza
router.get("/uniqueBranches", uniqueBranches); //select paramatrizado


async function uniqueSurvey(req, res) {

  let rows = []

  // if (req.query.UrlSurvey && req.query.Estado) {

  //   const data = [];
  //   data.ip = req.ip.split(':').pop();
  //   data.UrlSurvey = req.query.UrlSurvey;
  //   rows = await getIPAddress(data);
  // }

  try {
    const items = await controller.uniqueSurvey(req.query);
    if (rows.length > 0) {
      return res.status(400).send('Ya ha respondido la encuesta');
    }
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function uniqueQuestions(req, res) {

  try {
    const items = await controller.uniqueQuestions(req.query);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function uniqueBranches(req, res) {

  try {
    const items = await controller.uniqueBranches(req.query);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
}

async function uniqueAnswer(req, res) {

  try {
    const items = await controller.uniqueAnswer(req.query);
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
    //  next(err);
  }
}


module.exports = router;
