const express = require("express");

const respuesta = require("../../red/respuestas");
const seguridad = require("../../red/seguridad");
const controller = require("./controller");

const router = express.Router();

router.get("/:id",unique);

router.get("/", seguridad(), all);

router.post("/login", login);

router.put("/delete", seguridad(), del);

router.put("/", seguridad(), update);

async function login(req, res, next) {
  try {
    const token = await controller.login(req.body.Usuario, req.body.Password);
    respuesta.success(req, res, token, 200);
  } catch (err) {
    respuesta.error(req, res, "Error en Token", 500);
    //next(err);
  }
}

async function del(req, res, next) {
  try {
    const items = await controller.del(req.body);
    respuesta.success(req, res, "Item Eliminado Sastifactoriamente", 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
    //  next(err);
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

async function unique (req, res) {
  try{
    const items = await controller.unique(req.params.id);
    respuesta.success(req, res, items, 200);
  }catch(err){
    respuesta.error(req,res,err,500);
  }
  };

  async function all(req, res) {

    try {
      const items = await controller.user();
      respuesta.success(req, res, items, 200);
    } catch (err) {
      respuesta.error(req, res, err, 500);
    }
  }

module.exports = router;
